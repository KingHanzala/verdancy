import CreatePollForm from "../components/CreatePollForm"

const CreatePoll = () => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pt-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <CreatePollForm />
            </div>
        </div>
    );
}

export default CreatePoll;