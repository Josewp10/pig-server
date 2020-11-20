const twilio_id = process.env.TWILIO_ID;
const twilio_token = process.env.TWILIO_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;

const twilio_client = require('twilio')(twilio_id, twilio_token);

class ServicioSMS {
    constructor() {}
    async enviarSMS (info){
        twilio_client.messages.create({
            to:`+573184233137`,
            from:twilio_number,
            body: `nuevo ensayo`
        }).then(message => {console.log(message.sid)})
        .catch(error => {console.log(error)});
    }
}
module.exports = ServicioSMS;

