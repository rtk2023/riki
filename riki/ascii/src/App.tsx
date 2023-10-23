import { useState, ChangeEvent } from 'react';

function App() {
  const [file, setFile] = useState<File>();
  const [text, setText] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const getAscii = (intent: number) => {
    let ascii = ["@", "=", "+", "~", "-", ",", ".", " "];
    return ascii[Math.floor(intent / 32)];
  }

  const submit = () => {
    const reader = new FileReader();
    reader.onload = function(event) {
      const image = new Image();
      image.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as any;
        const scale = 400 / image.width;
        const canvasW = image.width * scale;
        const canvasH = image.height * scale;
        canvas.width = canvasW;
        canvas.height = canvasH;
        ctx.drawImage(image, 0, 0, canvasW, canvasH);
        let result = "";

        for (let y = 0; y < canvasH; y++) {
          for (let x = 0; x < canvasW; x++) {
            if (y % 8 === 0 && x % 4 === 0) {
              const pixel = ctx.getImageData(x, y, 1, 1);
              const data = pixel.data;
              const intent = Math.floor((data[0] + data[1] + data[2]) / 3);
              if (data[3] !== 0) {
                result += getAscii(intent);
              } else {
                result += " ";
              }
            }
          }
          if (y % 8 === 0) {
            result += "\n";
          }
        }
        setText(result);
      };
      image.src = event.target?.result as string;
    };
    reader.readAsDataURL(file!);
  }

  return (
    <div className="container">
            <div className="main">
                <div className="logo">
                <h1>{"Ascii converter!"}</h1>
                <p><i>{"|、"}<br />{"(˚ˎ 。7"}<br />{"|、˜〵"}<br />{"じしˍ,)ノ"}</i></p>
                </div>
                <div className="settings">
                    <div className="file">
                        <input onChange={handleFileChange} type="file" id="image" accept=".jpg, .jpeg, .png" />
                    </div>
                </div>
                <input onClick={submit} className="submit" type="button" value="Submit" />
            </div>
            <textarea readOnly value={text}></textarea>
    </div>
  )
}

export default App;
