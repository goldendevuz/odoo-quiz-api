import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Quiz API Documentation</h1>

      <div className="space-y-6">
        <section className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">/api/quizzes/</code> - List all quizzes
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">/api/quizzes/:id/</code> - Get a specific quiz by ID
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">/api/questions/</code> - List all questions
            </li>
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">/api/questions/:id/</code> - Get a specific question by ID
            </li>
          </ul>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
          <ol className="space-y-2 list-decimal pl-5">
            <li>Clone the repository</li>
            <li>
              Install dependencies with{" "}
              <code className="bg-muted px-1 py-0.5 rounded">pip install -r requirements.txt</code>
            </li>
            <li>
              Run migrations with <code className="bg-muted px-1 py-0.5 rounded">python manage.py migrate</code>
            </li>
            <li>
              Load the quiz data with{" "}
              <code className="bg-muted px-1 py-0.5 rounded">python manage.py load_quiz_data</code>
            </li>
            <li>
              Start the server with <code className="bg-muted px-1 py-0.5 rounded">python manage.py runserver</code>
            </li>
          </ol>
        </section>

        <div className="flex justify-center mt-8">
          <Link
            href="/api-explorer"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Explore API
          </Link>
        </div>
      </div>
    </div>
  )
}

