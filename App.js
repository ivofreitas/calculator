import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export const App = () => {

  const [ { displayValue, clearDisplay, operation, values, current }, setState ] = useState(initialState)

  const addDigit = (digit) => {

    const clearDisplayCheck = displayValue === '0' || clearDisplay

    if (digit === '.' && !clearDisplayCheck &&
     displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplayCheck ? '' : displayValue
    const newDisplayValue = currentValue + digit

    setState(prevState => ({...prevState, displayValue: newDisplayValue, clearDisplay: false}))

    if (digit !== '.') {
      const newValue = parseFloat(newDisplayValue)
      const newValues = [...values]
      newValues[current] = newValue
      setState(prevState => ({...prevState, values: newValues}))
    }
  }

  const clearMemory = () => {
    setState({...initialState})
  }

  const setOperation = (newOperation) => {
    if (current === 0) {
      setState(prevState => ({...prevState, operation: newOperation, current: 1, clearDisplay: true}))
    } else {
      const isEquals = newOperation === "="
      const newValues = [...values]
      try {
        newValues[0] = 
          eval(`${newValues[0]} ${operation} ${newValues[1]}`)
      } catch (e) {
        newValues[0] = values[0]
      }

      newValues[1] = 0
      setState(prevState => ({
        ...prevState, 
        displayValue: `${newValues[0]}`, 
        operation: isEquals ? null : newOperation,
        current: isEquals ? 0 : 1,
        clearDisplay: !isEquals,
        values: newValues
      }))
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearMemory} />
        <Button label='/' operation onClick={setOperation} />
        <Button label='7' addDigit onClick={addDigit} />
        <Button label='8' addDigit onClick={addDigit} />
        <Button label='9' addDigit onClick={addDigit} />
        <Button label='*' operation onClick={setOperation} />
        <Button label='4' addDigit onClick={addDigit} />
        <Button label='5' addDigit onClick={addDigit} />
        <Button label='6' addDigit onClick={addDigit} />
        <Button label='-' operation onClick={setOperation} />
        <Button label='1' addDigit onClick={addDigit} />
        <Button label='2' addDigit onClick={addDigit} />
        <Button label='3' addDigit onClick={addDigit} />
        <Button label='+' operation onClick={setOperation} />
        <Button label='0' double addDigit onClick={addDigit} />
        <Button label='.' addDigit onClick={addDigit} />
        <Button label='=' operation onClick={setOperation} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

