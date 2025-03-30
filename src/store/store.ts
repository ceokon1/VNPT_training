import { createStore } from "vuex";
import { usersModule, type UsersState } from "./modules/users";
import { coursesModule, CoursesState } from "./modules/courses"; // Import module courses
import { subjectModules, SubjectState } from "./modules/subject";
import { examModules, ExamState } from "./modules/exam";
import { questionModules, QuestionState } from "./modules/question";

export interface RootState {
  users: UsersState
  courses: CoursesState;
  subject: SubjectState
  exam: ExamState
  question: QuestionState
}

export const store = createStore({
  modules: {
    users: usersModule,
    courses: coursesModule,
    subject: subjectModules,
    exam: examModules,
    question: questionModules
  },
});
