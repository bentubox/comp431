import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import CardContainer from './card'

const Deck = ({articles}) => {
    return (<span>
            <div id="deck">
                {articles.map(article => 
                    <div key={ article._id } className="articleCard">
                        <CardContainer article = {article}/>
                    </div>
                )}
            </div>
        </span>
    )
}

const filterAndSortCards = (articles, crit) => {
    return articles.filter(({author, text}) => { return text && (text.toLowerCase().includes(crit.toLowerCase()) || crit.toLowerCase().includes(author.toLowerCase()))})
}

const mapStateToProps = (state) => {
    return {
        articles: filterAndSortCards(state.articles, state.searchCrit)
    }
}

const SortedDeck = connect(
    mapStateToProps,
   null
)(Deck)

export default SortedDeck