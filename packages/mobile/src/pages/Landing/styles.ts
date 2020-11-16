import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#8257E5'
    },
    header: {
        height: 400
    },
    box: {
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTitle: {
        textAlign: 'center',
        fontSize: 32,
        marginVertical: 30
    },
    boxButton: {
        backgroundColor: '#8257E5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        marginVertical: 40
    },
    boxButtonText: {
        color: '#FFF',
        fontSize: 22
    }
});

export default styles;
