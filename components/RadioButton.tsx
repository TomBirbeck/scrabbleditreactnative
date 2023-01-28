import { useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface RadioProps {
    setPlayer: React.Dispatch<React.SetStateAction<string>>;
    player: string;
}

const RadioButton = ({setPlayer, player}: RadioProps) => {
const [selected, setSelected] = useState(false)

const handleButton = useCallback(()=>{
setSelected(!selected)
setPlayer(player)
},[selected, player])

    return (
        <View style={styles.radioButtons}>
        <Text style={styles.radioText}>{player}</Text>
        <TouchableOpacity onPress={handleButton}>
            <View style={styles.outer}>
          {
              selected ?
              <View style={styles.inner}/>
              : null
            }
        </View>
            </TouchableOpacity>
        </View>
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
        },
        radioButtons: {
            marginHorizontal: 2,
            alignItems: 'center'
            },
            radioText :{
                color: 'white',
                marginBottom: 4,
            }
  })

  export default RadioButton