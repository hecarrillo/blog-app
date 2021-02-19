import React, {Component} from 'react';
import {listPosts} from '../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import {onCreatePost} from "../graphql/subscriptions";

class DisplayPosts extends Component {

    state = {
        posts: []
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts));
        this.setState({posts: result.data.listPosts.items});
        console.log(result.data.listPosts.items);
    }
    componentDidMount = async () => {
        this.getPosts();
        this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
    }
    render() {
        const { posts } = this.state;
        return posts.map(post => {
            return (
                <div className="posts" key={post.id}>
                    <h4>
                        {post.postOwnerUsername}
                        {": "}
                        {post.postTitle}
                    </h4>
                    <p>
                        {post.postBody}
                    </p>
                    <span>
                        <time  style={{ fontSyle: "italic", color: "#fcba03"}}>
                            {new Date(post.createdAt).toDateString()}
                        </time>
                    </span>
                    <span>
                        <DeletePost />                         
                        <EditPost />
                    </span>
                    <span>
                    </span>
                </div>
            );
        });
    }
}

export default DisplayPosts;
