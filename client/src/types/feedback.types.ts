import { FeedbackImougeType } from "./enums/feedbackImugeEnum.types"
import { UserType } from "./user.types"

export type FeedbackType = {
    id: number;
    type: keyof typeof import('./enums/feedbackImugeEnum.types').FeedbackImougeType;
    messageId: number;
    userId: number;
}
