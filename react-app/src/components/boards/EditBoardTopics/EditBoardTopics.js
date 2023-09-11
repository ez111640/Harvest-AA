import { useState } from "react"
export const EditBoardTopics = (topicInfo) => {

    const { boardTopics, topicIds, allTopArr } = topicInfo
    const [showEditTopics, setShowEditTopics] = useState(false)

    console.log("TOPICIDSHERE", topicInfo)

    const onClick = (e) => {
        e.preventDefault()
        setShowEditTopics(!showEditTopics)
    }
    return (
        <div>
            {showEditTopics === true ?
                <div className="topics-container">
                    {
                        allTopArr ?
                            <div className="topics-div">
                                {
                                    allTopArr.map((topic) => (
                                        <div >
                                            {topicIds[0] == topic.id || (topicIds.indexOf(topic.id) !== -1) ?

                                                <button type="button" onClick={onClick} className="topic-option tagged">{topic.name}</button> :
                                                <button type="button" onClick={onClick} className="topic-option untagged">{topic.name}</button>

                                            }
                                        </div>
                                    ))
                                }
                            </div> :
                            <div>
                            </div>
                    }
                </div> :
                <div>{
                    boardTopics.length ? <div>
                        {
                            boardTopics.map((topic) => <button type="button" onClick={onClick} className="topic-option tagged">{topic.topicName}</button>)
                        }
                    </div> : <div></div>
                }</div>}
        </div>
    )
}
