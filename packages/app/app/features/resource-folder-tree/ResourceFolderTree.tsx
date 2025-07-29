import type { ResourceTree } from "@nccl/api/client";
import { useCallback, useEffect, useState } from "react";
import { href, useFetcher } from "react-router";
import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";

import { FolderTree, type FolderTreeNodeClickHandler } from "./FolderTree";
import { normalizeFolderPath } from "./resource-folder-tree.utils";

import { LoadingState } from "../../components/states/LoadingState";

export function ResourceFolderTree({
  onSelect,
  initialPath,
}: {
  onSelect?: FolderTreeNodeClickHandler;
  initialPath?: string;
}) {
  const { load, data } = useFetcher();
  const [currentPath, setCurrentPath] = useState(initialPath || "__ROOT__");
  const [tree, setTree] = useState<ResourceTree>({});

  // when the selected path changes,
  // fetch the tree at the selected path
  useEffect(() => {
    const routePath = normalizeFolderPath(currentPath);
    console.log({ currentPath, routePath });
    load(href("/api/resource/tree/*", { "*": routePath }));
  }, [load, currentPath]);

  // when the tree is returned, updated the state
  useEffect(() => {
    if (!data) return;
    console.log({ data });
    setTree((prevState) => {
      return merge(cloneDeep(prevState), data);
    });
  }, [data]);

  const handleSelectFolder = useCallback<FolderTreeNodeClickHandler>(
    (path, resource) => {
      setCurrentPath(path);
      if (onSelect) onSelect(path, resource);
    },
    [onSelect]
  );

  if (!data) return <LoadingState>Loading folders...</LoadingState>;

  return (
    <FolderTree
      resourceTree={tree}
      basePath=""
      currentPath={currentPath}
      onSelectFolder={handleSelectFolder}
    />
  );
}
