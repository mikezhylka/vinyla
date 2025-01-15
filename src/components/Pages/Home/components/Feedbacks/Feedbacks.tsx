import { feedbacks } from "../../../../../api/feedbacks";
import { Feedback } from "../../../../blocks/Feedback/Feedback";
import "./feedbacks.scss";

export const Feedbacks: React.FC = () => (
  <section className="feedbacks">
    <div className="feedbacks__title-wrap">
      <h5 className="feedbacks__title">Feedbacks</h5>
    </div>

    <section className="feedbacks__comments">
      {feedbacks.map((feedback) => (
        <Feedback key={feedback.id} feedback={feedback} />
      ))}
      ;
    </section>
  </section>
);
