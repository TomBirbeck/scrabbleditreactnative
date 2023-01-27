import { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from "react-native";

const RadioButton = () => {
const [selected, setSelected] = useState(false)
    return (
        <TouchableOpacity onPress={()=>{setSelected(!selected)}}>
            <View style={styles.outer}>
          {
              selected ?
              <View style={styles.inner}/>
              : null
            }
        </View>
            </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
        outer : {
            height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
        inner: {
            height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: 'white',
        }
  })

  export default RadioButton