import { messageIds } from '@intl/types'
import * as React from 'react'
import { useForm } from 'react-final-form'

import { Form } from '@habx/lib-form-helper'

import { Select, Toggle } from '@components/final-form'

import useTranslate from '@hooks/translate/useTranslate'
import { GenerateNoteConfig, StaveClef } from '@lib/config'
import { Tones } from '@lib/types'

import { ConfigFormContainer } from './ConfigForm.style'

const SpyComponent: React.FunctionComponent<{}> = () => {
  const { submit, subscribe } = useForm()
  const handleSubmit = React.useCallback(
    (spiedPristine) => {
      if (!spiedPristine) {
        submit()
      }
    },
    [submit]
  )
  React.useEffect(() => {
    return subscribe(
      ({ pristine }) => {
        handleSubmit(pristine)
      },
      { pristine: true, values: true }
    )
  }, [handleSubmit, subscribe])

  return null
}

const ConfigForm: React.FunctionComponent<ConfigFormInterface> = ({
  onChange,
  value,
  disabled,
}) => {
  const t = useTranslate()
  return (
    <Form
      disabled={disabled}
      onSubmit={onChange}
      initialValues={value}
      render={({ values }) => (
        <ConfigFormContainer>
          <SpyComponent />
          <Select
            small
            canReset={false}
            name="clef"
            label="clef"
            options={Object.values(StaveClef).map((clef) => ({
              label: t(clef as 'treble' | 'bass'),
              value: clef,
            }))}
          />
          <Select
            small
            canReset={false}
            label="octaves"
            name="octaves"
            multi
            options={[2, 3, 4, 5, 6].map((octave) => ({
              value: octave,
              label: octave,
            }))}
          />
          <Select
            small
            placeholder="Sans tonalité particulière"
            name="tone"
            label="Tonalité"
            options={Object.keys(Tones).map((tone) => {
              const [rawNote, majorOrMinor] = tone.split('_')
              const [note, accidental] = rawNote.split('')
              return {
                value: Tones[tone],
                label: `${t(note as messageIds)}${accidental ?? ''} ${t(
                  majorOrMinor.toLowerCase() as messageIds
                )}`,
              }
            })}
          />
          {!values.tone && (
            <div>
              <Toggle name="withSharp" label="Avec #" />
              <Toggle name="withFlat" label="Avec b" />
            </div>
          )}
        </ConfigFormContainer>
      )}
    />
  )
}

interface ConfigFormInterface {
  value: GenerateNoteConfig
  disabled?: boolean
  onChange: (value: GenerateNoteConfig) => void
}

export default ConfigForm
