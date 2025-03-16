import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Quiz API Documentation</h1>

      <div className="space-y-4 md:space-y-6">
        <section className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">API Endpoints</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">/api/quizzes/</code> - List all quizzes
            </li>
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">/api/quizzes/:id/</code> - Get a
              specific quiz by ID
            </li>
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">/api/questions/</code> - List all
              questions
            </li>
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">/api/questions/:id/</code> - Get a
              specific question by ID
            </li>
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">
                /api/questions/by_quiz/?quiz_id=:id
              </code>{" "}
              - Get questions for a specific quiz
            </li>
            <li className="text-sm md:text-base">
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">/api/quizzes/counts/</code> - Get counts
              of quizzes and questions
            </li>
          </ul>
        </section>

        <section className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Frontend Demo</h2>
          <p className="text-sm md:text-base mb-4">
            This is a frontend demo of the Quiz API. The API Explorer uses mock data by default, but can be connected to
            a real Django backend when available.
          </p>
          <div className="flex justify-center">
            <Link
              href="/api-explorer"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm md:text-base"
            >
              Try API Explorer
            </Link>
          </div>
        </section>

        <section className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Backend Setup (When Ready)</h2>
          <p className="text-sm md:text-base mb-2">When you're ready to connect to a real Django backend:</p>
          <ol className="space-y-2 list-decimal pl-5">
            <li className="text-sm md:text-base">Set up the Django project with the provided code</li>
            <li className="text-sm md:text-base">
              Import quiz data with{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs md:text-sm">
                python scripts/import_quiz_data.py path/to/quiz-data.ts
              </code>
            </li>
            <li className="text-sm md:text-base">Run migrations and load the quiz data</li>
            <li className="text-sm md:text-base">
              In the API Explorer, switch to "Connect to Real API" and enter your backend URL
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}

