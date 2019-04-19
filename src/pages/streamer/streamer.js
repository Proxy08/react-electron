/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import MultiStreamsMixer from 'multistreamsmixer'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ReactDOM from 'react-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'

import Icon from '@material-ui/core/Icon'
import rtc from '../../rtc/webrtc'

const desktopCapturer = window.require('electron').desktopCapturer
const electron = window.require('electron')
const screenElectron = electron.screen
const storage = window.localStorage

const mainScreen = screenElectron.getPrimaryDisplay()
const allScreens = screenElectron.getAllDisplays()

const connection = new RTCMultiConnection(null, {
  useDefaultDevices: true,
})
console.log(connection)

const constraints = {
  audio: {
    echoCancellation: false,
    googAutoGainControl: true,
    channelCount: 2,
  },
  video:
  {
    width: { min: 640, max: 1280 },
    height: { min: 400, max: 720 },
    //  aspectRatio: 1.777777778,
    // frameRate: { max: 30 },
  },
}
const constraintShare = {
  audio: true,
  video: true,
}
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    video: {
      width: `${mainScreen.size.width}%`,
      height: `${mainScreen.size.height / 2}px`,
    },
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },

  sidebarAboutBox: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
})

const sections = [
  'Technology',
  'Design',
  'Culture',
  'Business',
  'Politics',
  'Opinion',
  'Science',
  'Health',
  'Style',
  'Travel',
]

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
  },
]


const archives = [
  'March 2020',
  'February 2020',
  'January 2020',
  'December 2019',
  'November 2019',
  'October 2019',
  'September 2019',
  'August 2019',
  'July 2019',
  'June 2019',
  'May 2019',
  'April 2019',
]

const social = ['GitHub', 'Twitter', 'Facebook']

console.log(mainScreen, allScreens)

class Streamer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(storage.getItem('user')),
      type: '',
      name: 'hai',
      labelWidth: 0,

    }
  }

  componentDidMount() {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line react/destructuring-assignment
    const broadcast = this.state.user._id
    connection.enableScalableBroadcast = true
    connection.dontOverrideSession = true
    // each relaying-user should serve only 1 users
    connection.maxRelayLimitPerUser = 1
    connection.autoCloseEntireSession = false

    // by default, socket.io server is assumed to be deployed on your own URL
    connection.socketURL = 'https://jiffeo.tv/'
    connection.dontCaptureUserMedia = true
    // comment-out below line if you do not have your own socket.io server
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.socketMessageEvent = 'scalable-media-broadcast-demo'
    const videoConstraints = {
      mandatory: {
        minWidth: 640,
        minHeight: 400,
        maxWidth: 1920,
        maxHeight: 1080,
        minAspectRatio: 1.77,
        minFrameRate: 3,
        maxFrameRate: 4,
      },
      optional: [],
    }

    connection.autoCreateMediaElement = false
    connection.mediaConstraints.video = videoConstraints
    connection.connectSocket((socket) => {
      connection.dontCaptureUserMedia = true
      socket.on('logs', (log) => {
        //  document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
         console.log(log);
      })


        // console.log('incoming is called')
        // console.log(liveid)
        // console.log(userid)
        // console.log(msg)

      // this event is emitted when a broadcast is absent.
      socket.on('start-broadcasting', (typeOfStreams) => {
        // console.log('start-broadcasting', typeOfStreams);

        // host i.e. sender should always use this!
        connection.sdpConstraints.mandatory = {
          OfferToReceiveVideo: false,
          OfferToReceiveAudio: false,
        }
        connection.session = typeOfStreams

        // "open" method here will capture media-stream
        // we can skip this function always; it is totally optional here.
        // we can use "connection.getUserMediaHandler" instead
        // connection.open(broadcastid);

        connection.open(broadcast, (isRoomOpened, roomid, error) => {
          if (error) {
            //   alert(error);
          }

          if (isRoomOpened === true) {
            alert('Votre Live vient de commencer.')
            this.onCreateStreaming()
          }
        })
    })
  })
}

  onCreateStreaming = async () => {
    // console.log(this.currentUser);
    // console.log(this.currentUser._id);
    // console.log(this.currentUser.username);
    // console.log(' picture :', this.currentUser.picture)
    // console.log(config.url)
    console.log('on create')
    this.onStartLive()
      try {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
        const body = {
          id: this.state.user._id,
          author: this.state.user.username,
          title: 'test',
          picture: this.state.user.picture,
        }
        // console.log('inside message ');
        await axios.post(`https://jiffeo.tv/mobile/${this.state.user.username}`,
          body,
headers )
          .then(response => response.json())
          .then((responseData) => {
            console.log("POST response", responseData);

           
          }).catch((error) => {
            // console.warn(error); console.log(error)
          })
      
      } catch (error) {
console.log('error',error)
      }
  }


  cameraChoice = (choix) => {
    if (choix === 1) {
      this.camerOnly()
    } else if (choix === 2) {
      this.getMixedCameraAndScreen()
    } else if (choix === 3) {
      this.screenOnly()
    } else {
      const video = document.getElementById('video-preview')
      video.srcObject = null
      video.muted = true
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      const track = stream.getTracks()[0] // if only one media track
track.stop()
      })
    }
  }

      getMixedCameraAndScreen = () => {
        if (navigator.getDisplayMedia) {
          navigator.getDisplayMedia({ video: true }).then((screenStream) => {
            afterScreenCaptured(screenStream)
          })
        } else if (navigator.mediaDevices.getDisplayMedia) {
          navigator.mediaDevices.getDisplayMedia({ video: true }).then((screenStream) => {
            console.log('screen: ', screenStream)
            this.afterScreenCaptured(screenStream)
          })
        } else {
          navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
              this.afterScreenCaptured(stream)
})
.catch((e) => {
  if (e.name == myCustomErrorForExtensionNotInstalledString) {
    // come up with a UX for installation the extension
  }
})
        }
      }

  camerOnly = () => {
    connection.session = {
      audio: true,
      video: true,
      data: true,
      oneway: true,
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        const video = document.getElementById('video-preview')
        video.srcObject = mediaStream
        video.muted = true
        console.log('inside initiator')
        // if (recordStream){


        connection.attachStreams = [mediaStream]
        video.onloadedmetadata = function (e) {
          video.play()
        }
      })
      .catch((err) => { // console.log(err.name + ": " + err.message);
      })
  }

  // global variables

    screenOnly = () => {
      const audioContext = new AudioContext()
      const gainNode = audioContext.createGain()


      connection.session = {
        audio: true,
        data: true,
        oneway: true,
      }
      if (navigator.getDisplayMedia) {
        //     navigator.getDisplayMedia({ video: true }).then((screenStream) => {
        desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
          if (error) {
            console.log('error', error)
          }
          for (let i = 0; i < sources.length; ++i) {
            // if (sources[i].name === 'Electron') {
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[i].id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720,
                },
              },
            }).then((screenStream) => {
              navigator.mediaDevices.getUserMedia({
                audio: true,
              }).then((microphoneStream) => {
                // connection.addStream(microphoneStream);
                console.log('microphone: ', microphoneStream)
                screenStream.fullcanvas = true
                screenStream.width = screen.width // or 3840
                screenStream.height = screen.height // or 2160
                const mixer = new MultiStreamsMixer([microphoneStream, screenStream])

                mixer.frameInterval = 33
                mixer.startDrawingFrames()

                connection.attachStreams = [mixer.getMixedStream()]
                const video = document.getElementById('video-preview')

                video.srcObject = mixer.getMixedStream()

                //  video.srcObject = screenStream;
                video.muted = true
              })
            })


              .catch(e => handleError(e))
          }
        }).catch(() => {
          alert('could not connect stream')
      })
      } else if (navigator.mediaDevices.getDisplayMedia) {
        // console.log('sourceId: ',sourceId)
        const screen_constraints = {
          video: {
            mandatory: {
              chromeMediaSource: 'screen',
              maxWidth: 1920,
              maxHeight: 1080,
              minAspectRatio: 1.77,
            },
          },
        }

        const video = document.getElementById('video-preview')


        //  video.srcObject = screenStream;
        video.muted = true


        //  connection.attachStreams = [mediaStream];


        navigator.mediaDevices.getDisplayMedia({ video: true }).then((screenStream) => {
          navigator.mediaDevices.getUserMedia({
            audio: true,
          }).then((microphoneStream) => {
            screenStream.fullcanvas = true
            screenStream.width = screen.width // or 3840
            screenStream.height = screen.height // or 2160


            connection.attachStreams = [mixer.getMixedStream()]
            const video = document.getElementById('video-preview')

            video.srcObject = mixer.getMixedStream()
            // connection.addStream({
            //     audio: true
            // });


            //  video.srcObject = screenStream;
            video.muted = true
          })

          //  connection.attachStreams = [mediaStream];
          video.onloadedmetadata = function (e) {
            video.play()
          }
          // afterScreenCaptured(screenStream);
        })
      } else {
        desktopCapturer.getSources({ types: ['window'] }, (error, sources) => {
          if (error) {
            console.log('error', error)
          }
          for (let i = 0; i < sources.length; ++i) {
            // if (sources[i].name === 'Electron') {
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[i].id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720,
                },
              },
            }).then((screenStream) => {
              navigator.mediaDevices.getUserMedia({
                audio: true,
              }).then((microphoneStream) => {
                // connection.addStream(microphoneStream);
                console.log('microphone: ', microphoneStream)
                screenStream.fullcanvas = true
                screenStream.width = screen.width // or 3840
                screenStream.height = screen.height // or 2160
                const mixer = new MultiStreamsMixer([microphoneStream, screenStream])

                mixer.frameInterval = 33
                mixer.startDrawingFrames()

                connection.attachStreams = [mixer.getMixedStream()]
                const video = document.getElementById('video-preview')

//                video.srcObject = mixer.getMixedStream()

                  video.srcObject = screenStream
                video.muted = true
              })
            })


              .catch(e => console.log(e))
          }
        })
        // .catch(() => {
        //   alert('could not connect stream')
        // })
      }
    };


 afterScreenCaptured = (screenStream) => {
   const video = document.getElementById('video-preview')
   navigator.mediaDevices.getUserMedia(constraintShare).then((cameraStream) => {
     screenStream.fullcanvas = true
     screenStream.width = screen.width // or 3840
     screenStream.height = screen.height // or 2160

     cameraStream.width = parseInt((15 / 100) * screenStream.width)
     cameraStream.height = parseInt((15 / 100) * screenStream.height)
     cameraStream.top = screenStream.height - cameraStream.height
     cameraStream.left = screenStream.width - cameraStream.width

     // fullCanvasRenderHandler(screenStream, 'Your Screen!');
     //  normalVideoRenderHandler(cameraStream, 'Your Camera!');

     const mixer = new MultiStreamsMixer([screenStream, cameraStream])

     mixer.frameInterval = 33
     mixer.startDrawingFrames()

     video.srcObject = mixer.getMixedStream()

     const mediaStream = mixer.getMixedStream()
     video.muted = true
     video.onloadedmetadata = function (e) {
       video.play()
     }
     //        updateMediaHTML('Mixed Screen+Camera!');

     connection.attachStreams = [mediaStream]
     this.addStreamStopListener(screenStream, () => {
       mixer.releaseStreams()
       videoPreview.pause()
       videoPreview.src = null

       cameraStream.getTracks().forEach((track) => {
         track.stop()
       })
     })
   })
 }

       addStreamStopListener = (stream, callback) => {
  stream.addEventListener('ended', () => {
    callback()
    callback = function () { }
  }, false)
  stream.addEventListener('inactive', () => {
    callback()
    callback = function () { }
  }, false)
  stream.getTracks().forEach((track) => {
    track.addEventListener('ended', () => {
      callback()
      callback = function () { }
    }, false)
    track.addEventListener('inactive', () => {
      callback()
      callback = function () { }
    }, false)
  })
       }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    this.cameraChoice(event.target.value)
  };

    onStartLive = () => {
      console.log('on strart live')
        const broadcastid = this.state.user._id
        const userid = this.state.user.username

        connection.sessionid = connection.channel = broadcastid
        // its mandatory in v3


        connection.direction = 'one-way'
        connection.userid = userid
        const broadcastId = broadcastid


        // console.log(connection.sessionid);

        // user need to connect server, so that others can reach him.

        const socket = connection.getSocket()


        connection.onstream = (event) => {
            if (connection.isInitiator && event.type !== 'local') {
                //     //console.log('connection isninitiator ', connection.isInitiator);
                //      //console.log('inside local')
                return
            }

            connection.isUpperUserLeft = false


            // console.log(connection.isInitiator);
        }
        connection.onopen = () => {

        }

        connection.dontCaptureUserMedia = true
       // connection.attachStreams = [this.state.stream]
        // VIDEO AUDIO

        if (connection.isInitiator) {
            // console.log('inside initiator');

            // forwarder should always use this!
            connection.sdpConstraints.mandatory = {
                OfferToReceiveVideo: false,
                OfferToReceiveAudio: false,
            }
        }

        connection.isUpperUserLeft = false

        connection.dontCaptureUserMedia = true


        connection.extra.broadcastId = broadcastid
        connection.session = {
            audio: true,
            video: true,
            data: true,
            oneway: true,
        }

        const videoConstraints = {
            mandatory: {
                minWidth: 640,
                minHeight: 400,
                maxWidth: 1920,
                maxHeight: 1080,
                minAspectRatio: 1.77,
                minFrameRate: 3,
                maxFrameRate: 4,
            },
            optional: [],
        }


        connection.autoCreateMediaElement = false
        connection.mediaConstraints.video = videoConstraints

        connection.dontCaptureUserMedia = true
        socket.emit('check-broadcast-presence', broadcastId, (isBroadcastExists) => {
            if (!isBroadcastExists) {
                // the first person (i.e. real-broadcaster) MUST set his user-id
                connection.userid = broadcastId
            }

            // console.log('check-broadcast-presence', broadcastId, isBroadcastExists);

            socket.emit('join-broadcast', {
                broadcastId,
                userid: connection.userid,
                typeOfStreams: connection.session,
            })
        })
        //   }, 2000)
    }


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={styles.layout}>

          <main>
            {/* Main featured post */}
            <div className={styles.video}>
              <video id="video-preview" />
            </div>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid container spacing={40} className={styles.cardGrid}>
              {featuredPosts.map(post => (
                <Grid item key={post.title} xs={12} md={6}>
                  <Card className={styles.card}>
                    <div className={styles.cardDetails}>
                      <CardContent>
                        <form className={styles.root} autoComplete="off">
                          <FormControl className={styles.formControl}>
                            <InputLabel htmlFor="type-simple">Camera</InputLabel>
                            <Select
                              value={this.state.type}
                              onChange={this.handleChange}
                              inputProps={{
                                name: 'type',
                                id: 'type-simple',
                              }}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>Camera</MenuItem>
                              <MenuItem value={2}>Camera + Ecran</MenuItem>
                              <MenuItem value={3}>Ecran </MenuItem>
                            </Select>
                          </FormControl>
                        </form>
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={styles.cardMedia}
                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={40} className={styles.mainGrid}>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Button onClick={() => this.onCreateStreaming()} variant="contained" color="primary" className={styles.button}>
        Send
                  {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                  <Icon className={styles.rightIcon}>send</Icon>
                </Button>
                <Divider />

              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={styles.sidebarAboutBox}>
                  <Typography variant="h6" gutterBottom>
                                    About
                  </Typography>
                  <Typography>

                                    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit
                                    amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                  </Typography>
                </Paper>
                <Typography variant="h6" gutterBottom className={styles.sidebarSection}>
                                Archives
                </Typography>
                {archives.map(archive => (
                  <Typography key={archive}>{archive}</Typography>
                ))}
                <Typography variant="h6" gutterBottom className={styles.sidebarSection}>
                                Social
                </Typography>
                {social.map(network => (
                  <Typography key={network}>{network}</Typography>
                ))}
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </div>
        {/* Footer */}

        {/* End footer */}
      </React.Fragment>
    )
  }
}
export default Streamer
