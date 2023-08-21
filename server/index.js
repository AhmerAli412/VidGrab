// //Buildin with nodejs
// const cp = require('child_process');
// const readline = require('readline');
// // External modules
// const ytdl = require('ytdl-core');
// const ffmpeg = require('ffmpeg-static');
// // Global constants
// const ref = 'https://www.youtube.com/watch?v=7zlWwyZApJY&ab_channel=SAMAATV';
// const tracker = {
//   start: Date.now(),
//   audio: { downloaded: 0, total: Infinity },
//   video: { downloaded: 0, total: Infinity },
//   merged: { frame: 0, speed: '0x', fps: 0 },
// };

// // Get audio and video streams
// const audio = ytdl(ref, { quality: 'highestaudio' })
//   .on('progress', (_, downloaded, total) => {
//     tracker.audio = { downloaded, total };
//   });
// const video = ytdl(ref, { quality: 'highestvideo' })
//   .on('progress', (_, downloaded, total) => {
//     tracker.video = { downloaded, total };
//   });

// // Prepare the progress bar
// let progressbarHandle = null;
// const progressbarInterval = 1000;
// const showProgress = () => {
//   readline.cursorTo(process.stdout, 0);
//   const toMB = i => (i / 1024 / 1024).toFixed(2);

//   process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
//   process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

//   process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
//   process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

//   process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
//   process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

//   process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
//   readline.moveCursor(process.stdout, 0, -3);
// };

// // Start the ffmpeg child process
// const ffmpegProcess = cp.spawn(ffmpeg, [
//   // Remove ffmpeg's console spamming
//   '-loglevel', '8', '-hide_banner',
//   // Redirect/Enable progress messages
//   '-progress', 'pipe:3',
//   // Set inputs
//   '-i', 'pipe:4',
//   '-i', 'pipe:5',
//   // Map audio & video from streams
//   '-map', '0:a',
//   '-map', '1:v',
//   // Keep encoding
//   '-c:v', 'copy',
//   // Define output file
//   'out.mkv',
// ], {
//   windowsHide: true,
//   stdio: [
//     /* Standard: stdin, stdout, stderr */
//     'inherit', 'inherit', 'inherit',
//     /* Custom: pipe:3, pipe:4, pipe:5 */
//     'pipe', 'pipe', 'pipe',
//   ],
// });
// ffmpegProcess.on('close', () => {
//   console.log('done');
//   // Cleanup
//   process.stdout.write('\n\n\n\n');
//   clearInterval(progressbarHandle);
// });

// // Link streams
// // FFmpeg creates the transformer streams and we just have to insert / read data
// ffmpegProcess.stdio[3].on('data', chunk => {
//   // Start the progress bar
//   if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
//   // Parse the param=value list returned by ffmpeg
//   const lines = chunk.toString().trim().split('\n');
//   const args = {};
//   for (const l of lines) {
//     const [key, value] = l.split('=');
//     args[key.trim()] = value.trim();
//   }
//   tracker.merged = args;
// });
// audio.pipe(ffmpegProcess.stdio[4]);
// video.pipe(ffmpegProcess.stdio[5]);

































// const express = require('express');
// const bodyParser = require('body-parser');
// const ytdl = require('ytdl-core');
// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const readline = require('readline');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.post('/download', (req, res) => {
//   const url = req.body.url;
//   const tracker = {
//     start: Date.now(),
//     audio: { downloaded: 0, total: Infinity },
//     video: { downloaded: 0, total: Infinity },
//     merged: { frame: 0, speed: '0x', fps: 0 },
//   };

//   const audio = ytdl(url, { quality: 'highestaudio' }).on('progress', (_, downloaded, total) => {
//     tracker.audio = { downloaded, total };
//   });

//   const video = ytdl(url, { quality: 'highestvideo' }).on('progress', (_, downloaded, total) => {
//     tracker.video = { downloaded, total };
//   });

//   let progressbarHandle = null;
//   const progressbarInterval = 1000;

//   const showProgress = () => {
//     readline.cursorTo(process.stdout, 0);
//     const toMB = i => (i / 1024 / 1024).toFixed(2);

//     process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
//     process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

//     process.stdout.write(`Running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
//     readline.moveCursor(process.stdout, 0, -3);
//   };

//   const ffmpegProcess = cp.spawn(ffmpeg, [
//     '-loglevel', '8', '-hide_banner',
//     '-progress', 'pipe:3',
//     '-i', 'pipe:4',
//     '-i', 'pipe:5',
//     '-map', '0:a',
//     '-map', '1:v',
//     '-c:v', 'copy',
//     'out.mkv',
//   ], {
//     windowsHide: true,
//     stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe', 'pipe'],
//   });

//   ffmpegProcess.on('close', () => {
//     console.log('done');
//     process.stdout.write('\n\n\n\n');
//     clearInterval(progressbarHandle);
//   });

//   ffmpegProcess.stdio[3].on('data', chunk => {
//     if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
//     const lines = chunk.toString().trim().split('\n');
//     const args = {};
//     for (const l of lines) {
//       const [key, value] = l.split('=');
//       args[key.trim()] = value.trim();
//     }
//     tracker.merged = args;
//   });

//   audio.pipe(ffmpegProcess.stdio[4]);
//   video.pipe(ffmpegProcess.stdio[5]);

//   res.sendStatus(200);
// });

// app.listen(port, '10.135.84.136', () => {
//   console.log(`Server is listening on 10.135.84.136:${port}`);
// });





















// const express = require('express');
// const bodyParser = require('body-parser');
// const ytdl = require('ytdl-core');
// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const readline = require('readline');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid'); // Import the uuid package

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.post('/download', (req, res) => {
//   const url = req.body.url;
//   const tracker = {
//     start: Date.now(),
//     audio: { downloaded: 0, total: Infinity },
//     video: { downloaded: 0, total: Infinity },
//     merged: { frame: 0, speed: '0x', fps: 0 },
//   };

//   const audio = ytdl(url, { quality: 'highestaudio' }).on('progress', (_, downloaded, total) => {
//     tracker.audio = { downloaded, total };
//   });

//   const video = ytdl(url, { quality: 'highestvideo' }).on('progress', (_, downloaded, total) => {
//     tracker.video = { downloaded, total };
//   });

//   let progressbarHandle = null;
//   const progressbarInterval = 1000;

//   const showProgress = () => {
//     readline.cursorTo(process.stdout, 0);
//     const toMB = i => (i / 1024 / 1024).toFixed(2);

//     process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
//     process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

//     process.stdout.write(`Running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
//     readline.moveCursor(process.stdout, 0, -3);
//   };

//   const filename = `${uuidv4()}.mkv`; // Generate a random filename
//   const ffmpegProcess = cp.spawn(ffmpeg, [
//     '-loglevel', '8', '-hide_banner',
//     '-progress', 'pipe:3',
//     '-i', 'pipe:4',
//     '-i', 'pipe:5',
//     '-map', '0:a',
//     '-map', '1:v',
//     '-c:v', 'copy',
//     filename, // Use the generated filename
//   ], {
//     windowsHide: true,
//     stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe', 'pipe'],
//   });

//   ffmpegProcess.on('close', () => {
//     console.log('done');
//     process.stdout.write('\n\n\n\n');
//     clearInterval(progressbarHandle);
//   });

//   ffmpegProcess.stdio[3].on('data', chunk => {
//     if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
//     const lines = chunk.toString().trim().split('\n');
//     const args = {};
//     for (const l of lines) {
//       const [key, value] = l.split('=');
//       args[key.trim()] = value.trim();
//     }
//     tracker.merged = args;
//   });

//   audio.pipe(ffmpegProcess.stdio[4]);
//   video.pipe(ffmpegProcess.stdio[5]);

//   res.sendStatus(200);
// });

// app.listen(port, '10.135.84.136', () => {
//   console.log(`Server is listening on 10.135.84.136:${port}`);
// });















//working
// const express = require('express');
// const bodyParser = require('body-parser');
// const ytdl = require('ytdl-core');
// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const readline = require('readline');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid'); // Import the uuid package

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.post('/download', (req, res) => {
//   const url = req.body.url;
//   const quality = req.body.quality; // Get the selected quality

//   const tracker = {
//     start: Date.now(),
//     audio: { downloaded: 0, total: Infinity },
//     video: { downloaded: 0, total: Infinity },
//     merged: { frame: 0, speed: '0x', fps: 0 },
//   };

//   const audio = ytdl(url, { quality: `${quality}audio` }).on('progress', (_, downloaded, total) => {
//     tracker.audio = { downloaded, total };
//   });

//   const video = ytdl(url, { quality: `${quality}video` }).on('progress', (_, downloaded, total) => {
//     tracker.video = { downloaded, total };
//   });

//   let progressbarHandle = null;
//   const progressbarInterval = 1000;

//   const showProgress = () => {
//     readline.cursorTo(process.stdout, 0);
//     const toMB = i => (i / 1024 / 1024).toFixed(2);

//     process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
//     process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

//     process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
//     process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

//     process.stdout.write(`Running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
//     readline.moveCursor(process.stdout, 0, -3);
//   };

//   const filename = `${uuidv4()}.mkv`; // Generate a random filename
//   const ffmpegProcess = cp.spawn(ffmpeg, [
//     '-loglevel', '8', '-hide_banner',
//     '-progress', 'pipe:3',
//     '-i', 'pipe:4',
//     '-i', 'pipe:5',
//     '-map', '0:a',
//     '-map', '1:v',
//     '-c:v', 'copy',
//     filename, // Use the generated filename
//   ], {
//     windowsHide: true,
//     stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe', 'pipe'],
//   });

//   ffmpegProcess.on('close', () => {
//     console.log('done');
//     process.stdout.write('\n\n\n\n');
//     clearInterval(progressbarHandle);
//   });

//   ffmpegProcess.stdio[3].on('data', chunk => {
//     if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
//     const lines = chunk.toString().trim().split('\n');
//     const args = {};
//     for (const l of lines) {
//       const [key, value] = l.split('=');
//       args[key.trim()] = value.trim();
//     }
//     tracker.merged = args;
//   });

//   audio.pipe(ffmpegProcess.stdio[4]);
//   video.pipe(ffmpegProcess.stdio[5]);

//   res.sendStatus(200);
// });

// app.listen(port, '10.135.84.199', () => {
//   console.log(`Server is listening on 10.135.84.199:${port}`);
// });

 






const express = require('express');
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const readline = require('readline');
const os = require('os');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Update your CORS configuration to allow multiple origins
// Update your CORS configuration to allow multiple origins
const allowedOrigins = ['https://vid-grab.vercel.app'];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true); // Allow credentials if needed
  next();
});




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/download', (req, res) => {
  const url = req.body.url;
  const quality = req.body.quality;

  const tracker = {
    start: Date.now(),
    audio: { downloaded: 0, total: Infinity },
    video: { downloaded: 0, total: Infinity },
    merged: { frame: 0, speed: '0x', fps: 0 },
  };

  const audio = ytdl(url, { quality: `${quality}audio` }).on('progress', (_, downloaded, total) => {
    tracker.audio = { downloaded, total };
  });

  const video = ytdl(url, { quality: `${quality}video` }).on('progress', (_, downloaded, total) => {
    tracker.video = { downloaded, total };
  });

  let progressbarHandle = null;
  const progressbarInterval = 1000;

  const showProgress = () => {
    readline.cursorTo(process.stdout, 0);
    const toMB = i => (i / 1024 / 1024).toFixed(2);

    process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
    process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

    process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
    process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

    process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
    process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

    process.stdout.write(`Running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
    readline.moveCursor(process.stdout, 0, -3);
  };

  const outputFilePath = path.join(os.homedir(), 'Downloads', `${uuidv4()}.mkv`);
  const ffmpegProcess = cp.spawn(ffmpeg, [
    '-loglevel', '8', '-hide_banner',
    '-progress', 'pipe:3',
    '-i', 'pipe:4',
    '-i', 'pipe:5',
    '-map', '0:a',
    '-map', '1:v',
    '-c:v', 'copy',
    outputFilePath,
  ], {
    windowsHide: true,
    stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe', 'pipe'],
  });

  ffmpegProcess.on('close', () => {
    console.log('done');
    process.stdout.write('\n\n\n\n');
    clearInterval(progressbarHandle);

    res.status(200).json({ message: 'Video downloaded successfully.' });
  });

  ffmpegProcess.stdio[3].on('data', chunk => {
    if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
    const lines = chunk.toString().trim().split('\n');
    const args = {};
    for (const l of lines) {
      const [key, value] = l.split('=');
      args[key.trim()] = value.trim();
    }
    tracker.merged = args;
  });

  audio.pipe(ffmpegProcess.stdio[4]);
  video.pipe(ffmpegProcess.stdio[5]);
});

app.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});












