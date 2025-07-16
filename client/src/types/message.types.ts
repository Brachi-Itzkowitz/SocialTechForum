import { FeedbackImougeType } from "./enums/feedbackImugeEnum.types"
import { UserType } from "./user.types"

import { FeedbackType } from "./feedback.types";

export type MessageType = {
    id: number,
    content: string,
    timeSend: Date,
    user: UserType,
    feedbacks: FeedbackType[]
}
