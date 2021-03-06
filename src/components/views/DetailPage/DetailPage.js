/** @format */

import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { API_URL, API_KEY } from "../../Config"
import Axios from "axios"
import { Tabs } from "antd"
import Cast from "./section/Cast"
import MovieDetail from "./section/MovieDetail"
import SimilarMovies from "./section/SimilarMovies"
import DetailMainVisual from "./section/DetailMainVisual"
const { TabPane } = Tabs

function DetailPage(props) {
    const [MainMovie, setMainMovie] = useState(null)
    const [CreditsInfo, setCreditsInfo] = useState(null)
    const [Videos, setVideos] = useState(null)
    const [Similar, setSimilar] = useState(null)
    const [Reviews, setReviews] = useState(null)
    const movId = props.match.params.movId
    const endpoint = `${API_URL}movie/${movId}?api_key=${API_KEY}`
    const credits = `${API_URL}movie/${movId}/credits?api_key=${API_KEY}`
    const videos = `${API_URL}movie/${movId}/videos?api_key=${API_KEY}`
    const similar = `${API_URL}movie/${movId}/similar?api_key=${API_KEY}`
    const reviews = `${API_URL}movie/${movId}/reviews?api_key=${API_KEY}`
    useEffect(function () {
        Axios.get(endpoint).then(function (response) {
            setMainMovie(response.data)
        })
        Axios.get(credits).then(function (response) {
            setCreditsInfo(response.data)
        })
        Axios.get(videos).then(function (response) {
            setVideos(response.data)
        })
        Axios.get(similar).then(function (response) {
            setSimilar(response.data)
        })
        Axios.get(reviews).then(function (response) {
            setReviews(response.data)
        })
    }, [])
    let tabList = [
        {
            name: "영화상세정보",
            component: Videos && Reviews && (
                <MovieDetail
                    data={MainMovie}
                    dataVideos={Videos}
                    dataReview={Reviews}
                />
            ),
        },
        {
            name: "출연진",
            component: CreditsInfo && <Cast data={CreditsInfo} />,
        },
        {
            name: "유사 영화",
            component: Similar && <SimilarMovies data={Similar} />,
        },
    ]
    return (
        <div className="movie-detail-content">
            {MainMovie && (
                <DetailMainVisual data={MainMovie}></DetailMainVisual>
            )}
            <Tabs defaultActiveKey="0">
                {MainMovie &&
                    tabList.map(function (item, idx) {
                        return (
                            <TabPane tab={item.name} key={idx}>
                                {item.component}
                            </TabPane>
                        )
                    })}
            </Tabs>
        </div>
    )
}

export default withRouter(DetailPage)
