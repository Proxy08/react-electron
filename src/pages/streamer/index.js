// const { ipcRenderer } = global.require('electron');
// const React = require('react');
// const ReactDOM = global.require('react-dom');
// const TitleBar = require('./component/titleBar.js');
// const VideoManeger = require('./component/videoManeger.js');
// ReactDOM.render(
//     <TitleBar title="Player" />,
//     document.getElementById('header')
// )

// ReactDOM.render(
//     <VideoManeger></VideoManeger>,
//     document.getElementById('body')
// )
import React from 'react';

export default class App extends React.Component {
    render() {
        return (<div>
            <div>
    <video></video>
    
      <a href="https://willowtreeapps.com/careers">Come work with me.</a>
        </div>);
    }
}