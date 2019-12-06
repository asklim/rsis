const Telegraf = require('telegraf');
const debug = require( 'debug' )('sapp:tbot');
const request = require( 'request' );
//const fs = require( 'fs' );

const bot = new Telegraf( process.env.MIKAVBOT_TOKEN );
/*  ,{
  telegram: {
    webhookReply: true,
  }
} );*/


bot.start( (ctx) => { 
  debug( 'start command' );
  ctx.replyWithHTML( '<b>Hello</b>' );
});

bot.help( (ctx) => { 
  debug( 'help command' );
  ctx.replyWithHTML( '<b>Help Text</b>' );
});

bot.command( '/geteco', 
  (ctx) => { 
    debug( '/geteco command' );
    //debug( 'ctx.chat: ', ctx.chat );
    let bestRatesVitebsk = "http://www.ecopress.by/cgi/vitebsk.php";
    uploadPhoto( ctx, bestRatesVitebsk );
   
});

bot.on( 'text', ({ reply, message }) => {
  debug( 'onText' );
  reply( 'Hello ' + message.text );
});

bot.on( 'message', (ctx) => { 
  // sticker or smilik
  debug( 'onMessage' );
  ctx.replyWithHTML( '<b>This is message</b>' );
  if( ctx.message.text ) ctx.reply( ctx.message.text ); //400 bad request: message text is empty
});



bot.use( ({ reply, message }, next) => {
  debug( message );
  reply( `echo: ${message.text}` );
  if( next ) { next(); }
});

//bot.hears( 'hi', ({ replyWithHTML }) => replyWithHTML('<b>Hello</b>'));
//debug('telegraf bot: ', bot);

module.exports = bot;




function streamImage(url) {
  let getOptions = {
    url,
    encoding: null,
    headers: {
      "Cache-Control": "no-cache",
    },
  };    
  return request
    .get( getOptions )
    .on( 'error', (err) => { 
        debug( `error image downloading from '${url}':\n`, err  );
      })
    .on( 'response', (res) => {
      debug( `image downloaded from '${res.request.href}'` );
      debug( `image downloaded: res.statusCode= ${res.statusCode}` );
      if( res.statusCode !== 200 ) {
        debug( `image downloading: no image data.` );  
      }
    });
      //debug( `image downloading: Length= ${buffer.length}. Is buffer= ${(buffer instanceof Buffer)}` );
      //debug( `image downloading: buffer=\n`, buffer ); //<Buffer 89 50 4e 47 0d 0a 1a 0a 00  ... 6014 more bytes>
}

function uploadPhoto(ctx, url) {
  let { token, } = ctx.telegram;
  let postOptions ={
    url: `${ctx.tg.options.apiRoot}/bot${token}/sendPhoto`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    formData: { 
      chat_id: ctx.chat.id,
      photo: streamImage( url ),
    }    
  };
  debug( `upload image: POST to '${postOptions.url}'` );
  //debug( `upload image: post Options :\n${JSON.stringify( postOptions )}` );
  request.post( postOptions,
    (err, res, resBody) => {
      if( err ) {
        debug( `error image uploading to '${res.request.href}'\n`, err  );
        return;   
      }        
      //debug( `typeof 'body': ${typeof resBody}` ); //string
      let body = JSON.parse( resBody );
      if( body.ok ) {
        let { file_id } = body.result.photo[0];
        debug( `image uploading: res.statusCode= ${res.statusCode}\nfile_id: `, file_id );
      } 
      else {
        debug( `uploading !ok: res.statusCode= ${res.statusCode}\nbody: `, body );        
      }      
  });
}
