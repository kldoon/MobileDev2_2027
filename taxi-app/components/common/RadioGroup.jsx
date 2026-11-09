import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';

/**
 * options: [option1, option2]
 * onOptionSelected:(selectedPption)=>{}
 */
const RadioGroup = (props) => {
  const [value, setValue] = useState('op1');

  const handleChange = (value) => {
    setValue(value)
    props.onOptionSelected(value === 'op1' ? props.options[0] : props.options[1]);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>{props.options[0]}</Text>
        <Checkbox value={value === 'op1'} onValueChange={() => handleChange('op1')} />
      </View>
      <View>
        <Text>{props.options[1]}</Text>
        <Checkbox value={value === 'op2'} onValueChange={() => handleChange('op2')} />
      </View>
    </View>
  )
}

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10
  },
});
