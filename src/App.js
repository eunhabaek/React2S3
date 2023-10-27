import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='eunhabucket';
const REGION ='ap-northeast-1';

AWS.config.update({
  accessKeyId: 'AKIAZ6BCJVVQBLVO3F5V',
  secretAccessKey: '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'
})

//저장할 버킷 객체 생성
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

function App() {
  //파일 업로드 진행 상태 저장할 상태 변수
  const [progress , setProgress] = useState(0);
  
  //업로드 파일 저장할 상태 변수
  const [selectedFile, setSelectedFile] = useState(null);
  
  // 파일의 선택을 변경 시 호출 함수
  const handleFileInput = (e) => {
    // 선택 파일을 실제로는 selectedFile에 저장
    setSelectedFile(e.target.files[0]);
  }
  // 전송 누를 때 호출되는 함수
  const uploadFile = (file) => {
    const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name
    };

  myBucket.putObject(params).on('httpUploadProgress', (evt) => {
  //전송 중간마다 전송 비율을 출력
    setProgress(Math.round((evt.loaded / evt.total) * 100))
  }).send((err) => {
  if (err) console.log(err)
  })
}

return <div>
  <div><h1>진행상황</h1>Native SDK File Upload Progress is {progress}%</div>
    <input type="file" onChange={handleFileInput}/>
    <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
  </div>
}

export default App;