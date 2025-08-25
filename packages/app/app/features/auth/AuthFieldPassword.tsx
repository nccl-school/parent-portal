import { css } from "@linaria/core";
import { passwordRules } from "@nccl/api/client";
import {
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  Icon,
} from "@nccl/components";
import { makeRem, makeColor } from "@nccl/theme";
import { Fragment } from "react/jsx-runtime";

const styles = css`
  padding: ${makeRem(16)};
  border-radius: ${makeRem(8)};
  gap: ${makeRem(4)};
  border: 1px solid ${makeColor("light-500")};

  dt {
    & > div {
      display: grid;
      place-content: center;
      height: 100%;
      width: 100%;
    }
  }

  dd {
    margin-left: ${makeRem(16)};
  }
`;

export function AuthPasswordMeter({ password }: { password: string }) {
  return (
    <>
      <DescriptionList className={styles}>
        {passwordRules.map((rule) => {
          const passed = rule.test(password);
          return (
            <Fragment key={rule.label}>
              <DescriptionListTag key="label">
                <div>
                  <Icon
                    dxIcon={
                      passed
                        ? "checkmark-circle-02-solid-standard"
                        : "cancel-01-stroke-standard"
                    }
                    dxColor={passed ? "success" : "danger"}
                  />
                </div>
              </DescriptionListTag>
              <DescriptionListData>{rule.label}</DescriptionListData>
            </Fragment>
          );
        })}
      </DescriptionList>
    </>
  );
}
