// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'; // Create an App.css file for styling

// function App() {
//   const [url, setUrl] = useState('');
//   const [qualities] = useState(['highest', 'lowest', 'medium']); // Add your desired qualities
//   const [selectedQuality, setSelectedQuality] = useState('');
//   const [downloading, setDownloading] = useState(false);
//   const [downloadProgress, setDownloadProgress] = useState({ percent: 0, totalSize: 0 });

//   const handleDownload = async () => {
//     try {
//       setDownloading(true);
//       setDownloadProgress({ percent: 0, totalSize: 0 });

//       const response = await axios.post(
//         'http://localhost:3001/download',
//         {
//           url: url,
//           quality: selectedQuality,
//         },
//         {
//           onDownloadProgress: progressEvent => {
//             const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//             setDownloadProgress({ percent: percentCompleted, totalSize: progressEvent.total });
//           },
//         }
//       );

//       // Handle response, e.g., show a download link or success message
//       console.log('Download response:', response.data);
//     } catch (error) {
//       console.error('Error downloading video:', error);
//       // Handle error, e.g., show an error message
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>YouTube Video Downloader</h1>
//       <div className="input-container">
//         <label>Video URL:</label>
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Enter YouTube URL"
//         />
//       </div>
//       <div className="input-container">
//         <label>Quality:</label>
//         <select
//           value={selectedQuality}
//           onChange={(e) => setSelectedQuality(e.target.value)}
//         >
//           {qualities.map((quality, index) => (
//             <option key={index} value={quality}>{quality}</option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleDownload} disabled={downloading}>
//         {downloading ? 'Downloading...' : 'Download'}
//       </button>
//       {downloading && (
//         <div className="progress-bar">
//           <div
//             className="progress"
//             style={{ width: `${downloadProgress.percent}%` }}
//           >
//             {`${downloadProgress.percent}%`}
//             ({(downloadProgress.totalSize / 1024 / 1024).toFixed(2)} MB)
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [url, setUrl] = useState('');
  const [qualities] = useState(['highest', 'lowest', 'medium']);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('Download');
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ percent: 0, totalSize: 0 });

  const handleDownload = async () => {
    try {
      setDownloadStatus('Downloading...');
      setDownloading(true);
      setDownloadProgress({ percent: 0, totalSize: 0 });

      const response = await axios.post(
        'http://localhost:3000/download', // Use the relative URL
        {
          url: url,
          quality: selectedQuality,
        },
        {
          onDownloadProgress: progressEvent => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setDownloadProgress({ percent: percentCompleted, totalSize: progressEvent.total });
          },
        }
      );

      console.log('Download response:', response.data);
      setDownloadStatus('Successfully Downloaded!');
    } catch (error) {
      console.error('Error downloading video:', error);
    } finally {
      setDownloading(false);
    }
  };


  return (
    <div className="App">
      <Navbar />
      <div className="absolute  right-[100px] z-10 h-[150px] w-[400px] rotate-[0deg] transform rounded-full bg-purple-600 blur-[150px]"></div>
      <div className="absolute dotted-background h-full top-0 left-0 right-0 z-0">
        <div className="absolute left-0 right-0 bottom-0 h-[300px]"></div>
      </div>
      <div className="relative  container m-auto px-6 md:px-12 lg:px-6">
        <h1 className="text-slate-200 mt-28 text-center pb-5 text-5xl w-full font-light sm:text-4xl md:text-5xl">
          YouTube Video{" "}
          <span className="inline font-bold bg-gradient-to-tr from-orange-500 to-yellow-300 bg-clip-text font-display tracking-tight text-transparent">
            Downloader
          </span>
        </h1>
        <h3 className="text-neutral-500 mx-auto max-w-screen-sm text-center">
          Download your favorite videos from YouTube with ease. Enter the video URL and choose the quality.
        </h3>
        <hr className="w-96 h-1 mx-auto opacity-20 bg-gray-100 border-0 rounded md:my-8 dark:bg-gray-700" />
        <div className="input-container ">
          {/* <label className="text-neutral-500">Video URL:</label> */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        {/* </div> */}
        {/* <div className="input-container"> */}
          {/* <label className="text-neutral-500">Quality:</label> */}
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            className="border border-gray-300 px-3 ml-2 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {qualities.map((quality, index) => (
              <option key={index} value={quality}>{quality}</option>
            ))}
          </select>
        </div>
        <button
        onClick={handleDownload}
        disabled={downloading}
        className="px-6 py-2 mt-4 bg-gradient-to-tr from-orange-500 to-yellow-300 hover:from-orange-600 hover:to-yellow-400 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed w-50"
      >
        {downloadStatus}
      </button>
        {downloading && (
          <div className="progress-bar mt-4">
            <div
              className="progress bg-blue-500"
              style={{ width: `${downloadProgress.percent}%` }}
            >
              {`${downloadProgress.percent}%`}
              ({(downloadProgress.totalSize / 1024 / 1024).toFixed(2)} MB)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
