import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Text, View, Button, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

import styles from './style';
import {socket} from '../../../App';

import {
    iconNotification, iconContact, iconProfile, iconTherm,
    iconDrop, iconHumidity, iconCold, iconVapor, iconHose,
    iconDelta, iconReturn, iconStatus, iconSetpoint, iconCapacity
} from '../../styles/icons';

const logoAzul = require('../../../assets/logoAzul.png');

import HeadButton from '../../components/HeadButton';

export default function Home({ navigation }) {

    const carouselRef = useRef(null);
    const [data, setData] = useState([
        //{ title: 'Sala Técnica', temp: '20.5°C', umi: '50%', po: '10°C' },
        //{ title: 'Sala de Exames', temp: '21.7°C', umi: '44.7%', po: '8.8°C' },
    ]);
    const [loading, setLoading] = useState(true);

    //let ScreenHeight = Dimensions.get("window").height - 150;

    useEffect(() => {
        // const socket = io('http://10.0.2.2:3000');
        //   console.log(socket);
        //setTimeout(() => {
        socket.on('updatingData', function (data) {
            setData(data);
            setLoading(false);
            //console.log(data);
        })
        // console.clear();
        // 
        //}, 5000);
    }, []);

    return (
        <>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Image source={logoAzul} style={{ height: 45, width: 45 }} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <HeadButton source={iconNotification} onPress={() => navigation.navigate('AllNotifications')} />
                    <HeadButton source={iconContact} onPress={() => navigation.navigate('AllContacts')} />
                    <HeadButton source={iconProfile} onPress={() => navigation.navigate('Profile')} />
                </View>
            </View>


            {
                loading ? (
                    <Text> Loading... </Text>
                ) : (
                        <ScrollView style={styles.container}>

                            {/*  Estrutura Sala técnica */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Sala Técnica</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconTherm} />
                                        <Text style={styles.text}>Temperatura:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[0].tmpSl01}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconHumidity} />
                                        <Text style={styles.text}>Umidade:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[0].umdSl01}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconDrop} />
                                        <Text style={styles.text}>Ponto de orvalho:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[0].dewSl01}</Text>
                                </View>
                            </View>

                            {/* Estrutura Sala de exames */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Sala de Exames</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconTherm} />
                                        <Text style={styles.text}>Temperatura:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[1].tmpSl03}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconHumidity} />
                                        <Text style={styles.text}>Umidade:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[1].umdSl03}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconDrop} />
                                        <Text style={styles.text}>Ponto de orvalho:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[1].dewSl03}</Text>
                                </View>
                            </View>

                            {/* Estrutura Tubo de fluxo */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Tubo de fluxo</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconVapor} />
                                        <Text style={styles.text}>Carga Térmica:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].thermicLoad}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconCold} />
                                        <Text style={styles.text}>Temperatura água gelada</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].tempagTF}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconReturn} />
                                        <Text style={styles.text}>Temperatura retorno</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].tmpRetAG}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconDelta} />
                                        <Text style={styles.text}>Delta 1</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].deltaT}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconHose} />
                                        <Text style={styles.text}>Vazão de água gelada</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].vzAlimAG}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconHose} />
                                        <Text style={styles.text}>Pressão de água gelada</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[2].prsAlimAG}</Text>
                                </View>
                            </View>

                            {/* Estrutura Exaustor */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Exaustor</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconStatus} />
                                        <Text style={styles.text}>Status:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[3].ex01_status}</Text>
                                </View>

                            </View>

                            {/* Estrutura Chiller 01 */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Chiller 01</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconStatus} />
                                        <Text style={styles.text}>Status:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[4].ch1Sts}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconCapacity} />
                                        <Text style={styles.text}>Capacidade:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[4].ch1Cap}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconSetpoint} />
                                        <Text style={styles.text}>Setpoint:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[4].ch1Set}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconTherm} />
                                        <Text style={styles.text}>Temperatura de proceso</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[4].tmpProc1}</Text>
                                </View>

                            </View>

                            {/* Estrutura Chiller 02 */}
                            <View style={styles.boxData}>
                                <Text style={styles.title}>Chiller 02</Text>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconStatus} />
                                        <Text style={styles.text}>Status:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[5].ch2Sts}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconCapacity} />
                                        <Text style={styles.text}>Capacidade:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[5].ch2Cap}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconSetpoint} />
                                        <Text style={styles.text}>Setpoint:</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[5].ch2Set}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.image} source={iconTherm} />
                                        <Text style={styles.text}>Temperatura de proceso</Text>
                                    </View>
                                    <Text style={styles.textbold}>{data[5].tmpProc2}</Text>
                                </View>

                            </View>

                            <View style={{ height: 40 }}></View>
                        </ScrollView>
                    )
            }


        </>
    );
}