import {SafeAreaView, SectionList, Text, StyleSheet} from 'react-native'

const INSTRUCTIONS = [
    {
        Title: 'To change a player name',
        data: ["Press the button labelled 'Change Names', type the new name into the input box, select which player you want to assign the name to and then press the button labelled 'set nane'"]
    },
    {
        Title: "To select a player's turn",
        data: ["Click on the player's button in the scoreboard"]
    },
    {
        Title: 'To play a word',
        data: ["Enter your word in the box labelled 'Enter your word', using the '_' character for blank tiles",
                "If you have and double or triple scoring letters enter them in the corresponding boxes",
                "If you have have all of your tiles press the button labelled 'All Tiles Used', a visual confirmation will show under the 'Active Bonues' title",
                "If you have a word that is eligible for double/triple points press the button labelled 'Word Mode' and select the correct option",
                "You can then either check your word score by pressing the button labelled 'Check Word' or submit your word by pressing 'Submit Word",
                ]
    },
    {
        Title: 'Finishing the game',
        data: ["Press the button labelled 'Final Tiles'",
                "Enter the left over tiles in order from 1-4. Do not select play turns here",
                "If a player has no tiles just enter the '_' character",
                "Press the button labelled 'End Game' "
            ]
    },
    {
        Title: 'Author',
        data: ["The Scrabbledit app created by Tom Birbeck using React Native"]
    }
]


const About = () => {
    return(
        <SafeAreaView style={styles.screenContainer}>
      <SectionList
        sections={INSTRUCTIONS}
        keyExtractor={item => item}
        renderItem={data => <Text style={styles.data}>{data.item}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.Title}</Text>
        )}
      />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#DBBA84',
        paddingHorizontal: 10

    },
    header: {
        fontWeight: 'bold',
        fontSize: 16,
        borderBottomWidth: 1,
        textAlign: 'center',
        marginBottom: 3,
    },
    data: {
        marginBottom: 10,
    }
})

export default About