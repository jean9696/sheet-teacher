import { withFinalForm } from '@habx/lib-form-helper'
import { TextInput, TextInputProps } from '@habx/ui-core'

export default withFinalForm<string>({})(
  TextInput as React.FunctionComponent<
    TextInputProps & { onKeyPress?: Function }
  >
)
