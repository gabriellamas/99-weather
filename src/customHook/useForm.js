// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const useForm = (type) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  function validate(value) {
    // FIXME: o condicional poderia ser escrito assim `if (!type) return true`
    if (type === false) return true

    // FIXME: o condicional poderia ser escrito assim `if (!value.length) { ... }`
    if (value.length === 0) {
      setError('Digite uma cidade')
      return false
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ target }) {
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value)
  }
}

export default useForm
