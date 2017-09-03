import React from 'react'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon, NavBar } from 'antd-mobile'

import './index.css'


class Container extends React.Component {
    componentWillMount() {
        // Connect to PeerJS, have server assign an ID instead of providing one
        // Showing off some of the configs available with PeerJS :).
        var peer = new window.Peer({
            // Set API key for cloud server (you don't need this if you're running your
            // own.
            key: 'x7fwx2kavpy6tj4i',
            // Set highest debug level (log everything!).
            debug: 3,
            // Set a logging function:
            logFunction: function () {
                var copy = Array.prototype.slice.call(arguments).join(' ');
                console.log(copy)
            }
        });

        var connectedPeers = {};
        // Show this peer's ID.
        peer.on('open', function (id) {
            window.$('#pid').text(id);
        });
        // Await connections from others
        peer.on('connection', connect);
        peer.on('error', function (err) {
            console.log(err);
        })

        // Handle a connection object.
        function connect(c) {
            // Handle a chat connection.
            if (c.label === 'chat') {
                var chatbox = window.$('<div></div>').addClass('connection').addClass('active').attr('id', c.peer);
                var header = window.$('<h1></h1>').html('Chat with <strong>' + c.peer + '</strong>');
                var messages = window.$('<div><em>Peer connected.</em></div>').addClass('messages');
                chatbox.append(header);
                chatbox.append(messages);

                // Select connection handler.
                chatbox.on('click', function () {
                    if (window.$(this).attr('class').indexOf('active') === -1) {
                        window.$(this).addClass('active');
                    } else {
                        window.$(this).removeClass('active');
                    }
                });

                window.$('.filler').hide();
                window.$('#connections').append(chatbox);
                    c.on('data', function (data) {
                    messages.append('<div><span className="peer">' + c.peer + '</span>: ' + data + '</div>');
                });

                c.on('close', function () {
                    alert(c.peer + ' has left the chat.');
                    chatbox.remove();
                    if (window.$('.connection').length === 0) {
                        window.$('.filler').show();
                    }
                    delete connectedPeers[c.peer];
                });
            } else if (c.label === 'file') {
                c.on('data', function (data) {
                    // If we're getting a file, create a URL for it.
                    if (data.constructor === ArrayBuffer) {
                        var dataView = new Uint8Array(data);
                        var dataBlob = new Blob([dataView]);
                        var url = window.URL.createObjectURL(dataBlob);
                        window.$('#' + c.peer).find('.messages').append('<div><span className="file">' +
                        c.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.</span></div>');
                    }
                });
            }

            connectedPeers[c.peer] = 1;
        }

        window.$(document).ready(function () {
            // Connect to a peer
            window.$('#connect').click(function () {
                var requestedPeer = window.$('#rid').val();
                if (!connectedPeers[requestedPeer]) {
                    // Create 2 connections, one labelled chat and another labelled file.
                    var c = peer.connect(requestedPeer, {
                        label: 'chat',
                        serialization: 'none',
                        metadata: { message: 'hi i want to chat with you!' }
                    });
                    
                    c.on('open', function () {
                        connect(c);
                    });
                    
                    c.on('error', function (err) { alert(err); });
                    
                    var f = peer.connect(requestedPeer, { label: 'file', reliable: true });
                    
                    f.on('open', function () {
                        connect(f);
                    });
                    
                    f.on('error', function (err) { alert(err); });
                }

                connectedPeers[requestedPeer] = 1;
            });

            // Close a connection.
            window.$('#close').click(function () {
                eachActiveConnection(function (c) {
                    c.close();
                });
            });

            // Send a chat message to all active connections.
            window.$('#send').submit(function (e) {
                e.preventDefault();

                // For each active connection, send the message.
                var msg = window.$('#text').val();

                eachActiveConnection(function (c, $c) {
                    if (c.label === 'chat') {
                        c.send(msg);
                        $c.find('.messages').append('<div><span className="you">You: </span>' + msg + '</div>');
                    }
                });

                window.$('#text').val('');
                window.$('#text').focus();
            });

            // Goes through each active peer and calls FN on its connections.
            function eachActiveConnection(fn) {
                var actives = window.$('.active');
                var checkedIds = {};
                actives.each(function () {
                    var peerId = window.$(this).attr('id');
                    if (!checkedIds[peerId]) {
                        var conns = peer.connections[peerId];
                        for (var i = 0, ii = conns.length; i < ii; i += 1) {
                            var conn = conns[i];
                            fn(conn, window.$(this));
                        }
                    }
                    checkedIds[peerId] = 1;
                });
            }

            // Show browser version
            window.$('#browsers').text(navigator.userAgent);
        });

        // Make sure things clean up properly.
        window.onunload = window.onbeforeunload = function (e) {
            if (!!peer && !peer.destroyed) {
                peer.destroy();
            }
        };
    }

    render() {
        return (
            <div>
                <div id="actions">
                    Your peer ID is <span id="pid"></span>
                    <br />
                    Connect to a peer: <input type="text" id="rid" placeholder="Someone else's id" />
                    <input className="button" type="button" value="Connect" id="connect" />
                    <br />
                    <br />

                    <form id="send">
                        <input type="text" id="text" placeholder="Enter message" />
                        <input className="button" type="submit" value="Send to selected peers" />
                    </form>
                    <button id="close">Close selected connections</button>
                </div>

                <div id="wrap">
                    <div id="connections">
                        <span className="filler">You have not yet made any connections.</span>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="warning browser">
                    <div className="important">
                        Your browser version: <span id="browsers"></span>
                        <br /> 
                        Currently <strong>Firefox 22+ and Google Chrome 26.0.1403.0 or above</strong> is required.
                    </div>
                    <br />
                    Note that p2p connections may also fail if you are behind stringent firewalls or both you and the remote peer and
                    behind symmetric NATs.

                    <div className="log" style={{'color':'#FF7500','text-shadow':'none','padding':'15px','background':'#eee'}}>
                        <strong>Connection status</strong>:<br />
                    </div>
                </div>
            </div>
        )
    }
}

Container.displayName = 'header/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (page) => push(page)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
