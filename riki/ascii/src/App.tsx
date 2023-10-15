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
        const scale = 200 / image.width;
        const canvasW = image.width * scale;
        const canvasH = image.height * scale;
        canvas.width = canvasW;
        canvas.height = canvasH;
        ctx.drawImage(image, 0, 0, canvasW, canvasH);
        let result = "";

        for (let y = 0; y < canvasH; y++) {
          for (let x = 0; x < canvasW; x++) {
            if (y % 2 == 0 && x % 2 == 0) {
              const pixel = ctx.getImageData(x, y, 1, 1);
              const data = pixel.data;
              const intent = Math.floor((data[0] + data[1] + data[2]) / 3);
              if (data[3] != 0) {
                result += getAscii(intent);
              } else {
                result += " ";
              }
            }
          }
          if (y % 2 == 0) {
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
    <main>
      <textarea readOnly value={text}></textarea>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
      <button onClick={submit}>Submit</button>
    </main>
  )
}

export default App;
