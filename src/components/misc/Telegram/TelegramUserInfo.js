import React, { useState, useEffect, useRef, } from 'react';
import Telegraf from 'telegraf';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import UserIdInputForm from './UserIdInputForm';
import InfoPanel from './InfoPanel';


import viewStyle from 'assets/jss/m-d-r/views/dashboardStyle.js';
const {
    cardCategoryWhite,
    cardTitleWhite,
} = viewStyle;


import styles from "assets/jss/misc/todosInputListStyle.js";

const useStyles = makeStyles(
    {
        ... styles(),
        ... cardCategoryWhite,
        ... cardTitleWhite,
        typo: {
            paddingLeft: "25%",
            marginBottom: "40px",
            position: "relative"
        },
    }
);


const TelegramUserInfo = () => {
    
    
    const tgBot = useRef( null );
    const [ chatId, setChatId ] = useState( '' );  
    const [ chatDetails, setChatDetails ] = useState( {chat: 'init'} );
    const [ accountInfo, setAccountInfo ] = useState( {bot: 'init'} );
    const [ token, setToken ] = useState( '' );

    const classes = useStyles();

    const MIKAVBOT_TOKEN = "1004685561:AAHiJB6Vq6ZLmNjedgoz2wshDHacq6sb92w";


    const saveChatId = idText => {

        console.log('save Chat Id.');
        let id = idText.trim();
        if( id ) { setChatId( id ); }
    };


    useEffect( () => {

        function _getToken () { return MIKAVBOT_TOKEN; }

        function getAccountInfo () {
            tgBot.current.telegram
                .getMe()
                .then( (info) => setAccountInfo( info ))
            .catch( (error) => setAccountInfo( error ));
        }

        console.log( 'useEffect token' );
        let theTGBotToken = _getToken();

        if( theTGBotToken ) {
            //console.log( `botAccount Token: '${theTGBotToken}'` );  
            tgBot.current = new Telegraf( theTGBotToken );

            setToken( theTGBotToken );
            getAccountInfo();
        }  
    }, [ token ] );


    useEffect( () => {

        function getChatDetails( id ) {

            console.log('get Chat Details.');
            tgBot.current.telegram
                .getChat( id )
                .then( (details) => setChatDetails( details ))
            .catch( (error) => setChatDetails( error ));
        }

        console.log('useEffect chat');
        if( chatId ) { getChatDetails( chatId ); }
    }, [ chatId ] );


    return (<div>
        <UserIdInputForm makeSave ={saveChatId} />
        <InfoPanel 
            title ={`Telegram User ${chatId} Details`} 
            info ={chatDetails} 
            classes ={classes}
        />
        <InfoPanel 
            title ={'Telegram bot Account Details'} 
            info ={accountInfo} 
            classes ={classes}
        />
    </div>);
};



export default TelegramUserInfo;
