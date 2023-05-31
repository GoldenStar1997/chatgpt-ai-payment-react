import { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

export default function Openai() {
  const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState({ choices: [] });
  const [payload, setPayLoad] = useState({
    model:"text-davinci-003",
    prompt:"The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
    temperature:0.9,
    max_tokens:150,
    top_p:1,
    frequency_penalty:0.0,
    presence_penalty:0.6,
    stop:[" Human:", " AI:"]
  });

  const getRes = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      data:  payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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"
      }
    }).then((res) => {
      responseHandler(res);
    }).catch((e) => {
      setLoading(false);
    });
  };

  const responseHandler = (res) => {
    if (res.status === 200) {
      setObj(res.data);
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <div className="container">
        <h1>This Hennadii's ChatGPT AI Chat App</h1>
        <div className="row">
          <div className="col-6">
            <textarea
              className="form-control"
              type="text"
              placeholder="Enter Text"
              readOnly={loading}
              onChange={(e) => {
                setPayLoad({
                  ...payload,
                  prompt: e.target.value
                });
              }}
              value={payload.prompt}
            />
          </div>
          <div className="col-6 text_wrap">
              {loading ? (
                <span>loading...</span>
              ) : (
                obj?.choices?.map((v, i) => <div key={i}>{v.text}</div>)
              )}
          </div>
        </div>
        <br />
        <div style={{ padding: "0 13px" }}>
          <Button as="button" className="btn btn-primary" variant="primary" size="large" disabled={loading} onClick={getRes}>
            {loading ? "Loading... " : "Get response"}
          </Button>
        </div>
      </div>
    </div>
  );
}
