export class DynamicNode {
  #dynamicNode: HTMLDivElement | null = null;

  getNode() {
    if (!this.#dynamicNode) {
      this.#dynamicNode = document.createElement("div");
      this.#dynamicNode.setAttribute("id", window.crypto.randomUUID());
      document.body.appendChild(this.#dynamicNode);
      return this.#dynamicNode;
    }
    return this.#dynamicNode;
  }

  destroy() {
    this.#dynamicNode?.remove();
    this.#dynamicNode = null;
  }
}
