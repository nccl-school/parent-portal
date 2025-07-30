import {
  FormGroup,
  InputCheckbox,
  InputGroup,
  Typography,
} from "@nccl/components";

export function ResourceActionAccessContentSchool() {
  return (
    <>
      <Typography dxNode="p" dxVariant="body1">
        Checking any boxes in this section will allow any user that has access
        to the parent portal to interact with this resource.
      </Typography>
      <br />
      <FormGroup>
        <InputGroup>
          <InputCheckbox dxLabelOrientation="after">
            <Typography dxNode="div" dxVariant="heading5">
              Anyone can view
            </Typography>
            <Typography dxNode="div" dxVariant="body3">
              All users will be able to:
              <ul>
                <li>view</li>
                <li>open</li>
                <li>download (if available)</li>
              </ul>
            </Typography>
          </InputCheckbox>
          <InputCheckbox dxLabelOrientation="after">
            <Typography dxNode="div" dxVariant="heading5">
              Anyone can edit
            </Typography>
            <Typography dxNode="div" dxVariant="body3">
              <div>
                All of the permissions in <strong>anyone can view</strong> plus:
              </div>
              <ul>
                <li>Delete</li>
                <li>Add / Remove / Update access</li>
                <li>Edit metadata</li>
              </ul>
            </Typography>
          </InputCheckbox>
        </InputGroup>
      </FormGroup>
    </>
  );
}
