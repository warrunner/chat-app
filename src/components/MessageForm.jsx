// eslint-disable

import { useState } from 'react';
import firebase from 'firebase';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
import { db } from '../firebase';
import { GoogleSpreadsheet } from 'google-spreadsheet';




const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }
    const chatsRef = db.collection('chats');
    // db.collection('chats').add({
    // message: text,
    // username: creds.userName,
    // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    chatsRef.doc(chatId.toString()).set({
      message: text,
      username: creds.userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log(text);
    setValue('');

    const SPREADSHEET_ID = '1UNF5B940PPuCtw8Dupdoa7aVHolx5TTfg2SN37gF348';
    const SHEET_ID = '1237191657'
    const CLIENT_EMAIL = 'chats-211@chats-data-319516.iam.gserviceaccount.com';
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC/r4tTacGJh/qo\nRlcCA1LRMD659wWos+U7T5wVtJkF71hpyjOPpDWH9lrvNYkcz/2F3tVXTEuLViU0\ndnLf8QMqAUIGrz1hdRJABwjf+eAjKTaCVEZMvSmY3FIxayKJAB2bPdXTNOQp29OD\nc0dDGrZfmw/cEl4hSNfdB2bOfH633MbJiP6sjZuFHEUmF7MQ1Jrx3CzdJVvaBA6Z\ntwnYMBJhzCnrFKc0XSNjBSz8GMaQXnuOgzcFDcG4pI2tiXheg+s9XM41/DoMPD1T\n3mY2lDP3EPceRBN+y9fra0Uxre1eXJzoPpGjA8cbq3cUvNsrhgd0Vkz5vmCQogJU\ncfafg0jdAgMBAAECggEAOLJbIv52bNAIH2rCxIkoH1DGVOoQRfCD3pGzCKaE1oEP\nZScWLifzX3ZKOlPa7OdGRSj+cFZUR+/gjE52tu9KMMvzdBe0L5XZoo+SG/GETtIb\nWdxEeOFAowKT2yMlsWET4L2e99w+mnT3cHuR+fK2O7wZKk5SgkTR+IH+chfXwVjr\n9ZroVQq3VwFHdNW6Yrd+ezRE+yyZqOy4NqV7pqS7UB62Cbx5VaW1QOMWGPmE5Lxi\nvMu5lOpBaxSO24lTAXps/om7OVC6T9F7whZGY1Knv42/uhZsTV2Q9Lm5z6FN6uUI\nmxz78HR4A+XvkX4WA1L8lQMQS6PnYGzxzdXdjXFmXwKBgQDxw2YnGd9DasSYfUpn\n4CFyIrd54+ihsi6Tsl2eF+5Q6fbtkZF2nIxdmdplst69UGwVUIQSLgah/Rr4awli\nvrWAmqWp7sMmtdTX9kSFo49wfIeaJr0nBxJWfTn1fcradRyDe2bEXXqK5I7BLd6V\n7/Vw9xRjgjre5bYRuytKMoROjwKBgQDK+TjTM8rOOZFICcElweEzdSACJZi2Tjuy\nLlTNI9/eyc/Aw7z67we7gow/qx4ouwU+zHznWwc5pwByxRpXcpu0SB94EoeqUcO4\nmSROrnzGq/6jnemwflRfhOKuBl9x3NtXQyfbx5nNljgI/AJ7fhKG8gHIu2YRtLCt\n9/bDTvVn0wKBgQCVwchBaFFYXYayPsocVkXhgYfNxVOQ9eLMMqyzBXfmP0dqGcXV\nh1ubj3YtkQNQmcSZ32owKLqLFVHjl8oUlLWxmBoOjYvtKq1RqYcAkTSFJV6KKnz4\n8/R0BtYkL2u8rtaey435DT6fUrzrBRLgJegPtb23djApannBugMyzuAOGQKBgQCR\nCVEPqhyrC/vCTCYWQtoXGQSMRC1BZ9nEUtMJ2y6nVfH8PmIVtSQDWx+4hx//3tO6\nsgg2kZcyHSF24V0XS6/zPO4vsJ38mHyQte15w7kphdFpPPe1xC+qKZyI2cjt5fFe\nA4DBzXkbrNHRqbJkaAv5HYkk1LP0xvbQ+TT9DrjRPQKBgQCu2Zzzyy1Qce6FEdkL\nLhe9BSncBRhGZnQ33y8xKKY4hdXMa5kqynT4EfhvusLC3BRU6nNjlw+1UmifE5HH\nfm4+LBJ+p7Kydj2UUyYGulEnDTWuPackSFHGWSje2aDr/tLxSoIXD34V8btSW9DP\n5qq4rriq8GEAfz15ytk9O3Nm+A==\n-----END PRIVATE KEY-----\n"

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
      try {
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        });
        // loads document properties and worksheets
        await doc.loadInfo();

        const sheet = doc.sheetsById[SHEET_ID];
        const result = await sheet.addRow(row);
      } catch (e) {
        console.error('Error: ', e);
      }
    };

      const newRow = { message: text,
        username: creds.userName,
        chatId,
         };

      appendSpreadsheet(newRow);
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
