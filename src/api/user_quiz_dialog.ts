module QuizDialog{
    const control_element_id = "book_control_content";
    const quiz_element_id = "quiz_dialog_content";

    const problem_counter_element_id = "problem_counter_content";
    const problem_element_id = "problem_content";
    const correct_rate_element_id = "correct_rate_content";

    const answer_group_element_id = "answer_group";
    const answer_element_id = "answer_content";

    const result_group_element_id = "quiz_result_group";
    const show_result_content_id = "show_result_content";

    export let correct_count = 0;
    export let incorrect_count = 0;

    export let problems: IProblemItem[];
    export let current_problem: IProblemItem;

    let problem_count: Number;

    /**
     * Show the quiz dialog. 
     *
     * @export
     */
    export async function Enabled(){
        let control_element = document.getElementById(control_element_id);
        let quiz_element = document.getElementById(quiz_element_id);

        if(control_element && quiz_element){
            DisableElement(control_element);
            EnableElement(quiz_element);

            InitVariables();
            await GetProblems();

            problem_count = problems.length;

            GoToNextProblem();
        }
        else{
            console.error(ErrorMessages.element_not_found);
        }
    }

    /**
     * Hide the quiz dialog.
     *
     * @export
     */
    export function Disabled(){
        let control_element = document.getElementById(control_element_id);
        let quiz_element = document.getElementById(quiz_element_id);

        if(control_element && quiz_element){
            EnableElement(control_element);
            DisableElement(quiz_element);
        }
        else{
            console.error(ErrorMessages.element_not_found);
        }
    }

    /**
     * Show the problem to this dialog or results.
     *
     * @warning This function calls ShowProblem() internally.
     * @export
     */
    export function GoToNextProblem(){
        if(problems.length != 0){
            let problem = problems.shift();
            
            if(problem){
                current_problem = problem;
                ShowProblem(problem);
            }
            else{
                console.error(ErrorMessages.unexpected);
            }
        }
        else{
            ShowResults();
        }
    }

    /**
     * Show the problem to this dialog.
     *
     * @export
     * @param {IBookContent} content problem
     */
    export function ShowProblem(content: IProblemItem){
        let problem_counter_element = document.getElementById(problem_counter_element_id);
        let problem_element = document.getElementById(problem_element_id);
        let correct_rate_element = document.getElementById(correct_rate_element_id);

        let answer_group_element = document.getElementById(answer_group_element_id);
        let answer_element = document.getElementById(answer_element_id);

        if(problem_counter_element && problem_element && correct_rate_element && answer_group_element && answer_element){
            let current_problem_number = correct_count + incorrect_count + 1;

            problem_counter_element.innerHTML = `${current_problem_number}/${problem_count}`;
            problem_element.innerHTML = content.problem;
            correct_rate_element.innerHTML = `Correct Rate : ${GetCorrectRate(content.correct, content.incorrect)}%`;

            DisableElement(answer_group_element);
            answer_element.innerHTML = content.answer;
        }
        else{
            console.error(ErrorMessages.element_not_found);
        }
    }

    /**
     * Show the answer.
     *
     * @export
     */
    export function ShowAnswer(){
        let answer_group_element = document.getElementById(answer_group_element_id);
        
        if(answer_group_element){
            EnableElement(answer_group_element);
        }
        else{
            console.error(ErrorMessages.element_not_found);
        }
    }

    /**
     * Show results.
     *
     * @export
     */
    export function ShowResults(){
        let quiz_group_element = document.getElementById(quiz_element_id);
        let result_group = document.getElementById(result_group_element_id);

        let show_result_content = document.getElementById(show_result_content_id);

        if(quiz_group_element && result_group && show_result_content){
            DisableElement(quiz_group_element);
            EnableElement(result_group);
            show_result_content.innerHTML = `Your results is ${correct_count}/${correct_count + incorrect_count}`;
        }
        else{
            console.error(ErrorMessages.element_not_found);
        }
    }

    export module Event{
        export function OnCorrectButtonClicked(){
            correct_count++;
            current_problem.correct++;
            current_problem.update();
            GoToNextProblem();
        }

        export function OnIncorrectButtonClicked(){
            incorrect_count++;
            current_problem.incorrect++;
            current_problem.update();
            GoToNextProblem();
        }
    }

    function InitVariables(){
        correct_count = 0;
        incorrect_count = 0;
    }

    function GetCorrectRate(correct: number, incorrect: number): number{
        if(correct + incorrect == 0){
            return 0;
        }
        else{
            return Math.floor(correct / (correct + incorrect) * 100);
        }
    }

    async function GetProblems() {
        if(BookItem.book_name){
            let problemClass = NCMBWrap.DataStore(BookItem.book_name);
    
            if(problemClass){
                await problemClass.fetchAll()
                    .then(function(results){
                        let original_problems = results as IProblemItem[];
    
                        //
                        // Suffle
                        //
                        problems = RandomSort.Do(original_problems);
                    })
                    .catch(function(err){
                        console.error(err);
                    });
            }
        }
    }

    function EnableElement(element: HTMLElement){
        element.style.display = "inline";
    }

    function DisableElement(element: HTMLElement){
        element.style.display = "none";
    }
}
