import React, {Component} from 'react';
import io from 'socket.io-client';
import './Feed.css';
import api from '../services/api';
import more from '../assets/more.svg';
import send from '../assets/send.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
class Feed extends Component{
    state = {
        feed: []
    }

    async componentDidMount(){
        this.registerToSocket();
        api({
            method: "get",
            url: 'posts',

        }).then(res=> {
            //console.log(res)
            this.setState({feed: res.data});
        }).catch(err => console.log(err));
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');
        socket.on('newPost', newPost => {
             this.setState({feed: [newPost, ...this.state.feed]})
        });
        socket.on('newLike', likedPost => {
            //console.log(likedPost)
            this.setState({
                feed: this.state.feed.map(post =>{
                    if(post._id === likedPost._id){
                        return likedPost;
                    }
                    return post;
                })
            });
        });
    }
    handleLike = (id) => {
        api({
            method: 'post',
            url: `posts/${id}/like`
        }).then((res) => {

        }).catch((err) => console.log(err));
    }
    render(){
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt="Mais"/>
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt=""/>
                        <footer>
                            <div className="actions">
                                <button type="button" onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt="Like"/>
                                </button>
                                <img src={comment} alt="Comment"/>
                                <img src={send} alt="Send"/>
                            </div>
                            <strong>{post.likes} curtidas</strong>
                            <p>{post.description}<span>{post.hashtags}</span></p>
                        </footer>
                    </article>
                )
                ) }
            </section>
        );
    }
}

export default Feed;