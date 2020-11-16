import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Landing: React.FC = () => {
    return (
        <View style={styles.background}>
            <View style={styles.header}>
            </View>
            <View style={styles.box}>
                <Text style={styles.boxTitle}>Bem-vindo!</Text>
                <TouchableOpacity style={styles.boxButton}>
                    <Text style={styles.boxButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Landing;
