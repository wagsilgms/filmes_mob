import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    Text,
    FlatList, 
    View, 
    Image, 
    StyleSheet, 
    ActivityIndicator
} from 'react-native';

const App = () => {

    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const requestMovies = async () => {
            setLoading(true);

            const req = await fetch('https://api.b7web.com.br/cinema');
            const json = await req.json();

            if (json) {
                setMovies(json);
            }

            setLoading(false);
        }

        requestMovies();

    }, []);

    return (
        <SafeAreaView style={styles.container}>

            {loading &&
                <View style={styles.loadingArea}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            }

            {!loading && 
                <>
                    <FlatList
                        style={styles.list}
                        data={movies}
                        renderItem={({item})=>(
                            <View style={styles.movieItem}>
                                <Text style={styles.movieTitle}>{item.titulo}</Text>
                                <Image
                                    source={{uri: item.avatar}}
                                    style={styles.movieImage}
                                    resizeMode='contain'
                                />
                            </View>
                        )}
                        keyExtractor={item=>item.titulo}
                    />       
                </>
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    list: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 40
    },
    movieItem: {
        marginBottom: 50
    },
    movieImage: {
        height: 400
    },
    movieTitle: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold'
    },
    loadingArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default App;