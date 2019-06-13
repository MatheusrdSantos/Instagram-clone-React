import React, {Component} from 'react';
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
        api({
            method: "get",
            url: 'posts',

        }).then(res=> {
            //console.log(res)
            this.setState({feed: res.data});
        }).catch(err => console.log(err));
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