"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

// Mock data for standalone deployment
const mockQuizData = [
  {
    id: "odoo",
    title: "Odoo Database Quiz",
    questions_count: 4,
    url: "/api/quizzes/odoo/",
  },
  {
    id: "nextjs",
    title: "Next.js Basics Quiz",
    questions_count: 4,
    url: "/api/quizzes/nextjs/",
  },
  {
    id: "react",
    title: "React Fundamentals Quiz",
    questions_count: 4,
    url: "/api/quizzes/react/",
  },
]

const mockOdooQuiz = {
  id: "odoo",
  title: "Odoo Database Quiz",
  questions: [
    {
      id: 1,
      question: "Within how many hours does an Odoo database need to be activated to ensure the full 15 day trial?",
      options: [
        "Four hours.",
        "Five hours.",
        "Zero hours, the database is automatically activated when you set it up.",
        "Three hours.",
      ],
      correct_answer: "Three hours.",
      url: "/api/questions/1/",
    },
    {
      id: 2,
      question: "What happens when a user is created in an Odoo database?",
      options: [
        "A password is automatically created and sent to the user's email address.",
        "An email is sent with a link to create a secure password to the Odoo database.",
        "No email is sent, the password appears on the screen.",
        "You can't create users from the main dashboard.",
      ],
      correct_answer: "An email is sent with a link to create a secure password to the Odoo database.",
      url: "/api/questions/2/",
    },
  ],
}

const mockQuestions = [
  {
    id: 1,
    quiz: "odoo",
    question: "Within how many hours does an Odoo database need to be activated to ensure the full 15 day trial?",
    options: [
      "Four hours.",
      "Five hours.",
      "Zero hours, the database is automatically activated when you set it up.",
      "Three hours.",
    ],
    correct_answer: "Three hours.",
  },
  {
    id: 2,
    quiz: "odoo",
    question: "What happens when a user is created in an Odoo database?",
    options: [
      "A password is automatically created and sent to the user's email address.",
      "An email is sent with a link to create a secure password to the Odoo database.",
      "No email is sent, the password appears on the screen.",
      "You can't create users from the main dashboard.",
    ],
    correct_answer: "An email is sent with a link to create a secure password to the Odoo database.",
  },
]

export default function ApiExplorer() {
  const [activeEndpoint, setActiveEndpoint] = useState("quizzes")
  const [responseData, setResponseData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quizId, setQuizId] = useState("odoo")
  const [questionId, setQuestionId] = useState("1")
  const [apiMode, setApiMode] = useState<"mock" | "real">("mock")
  const [apiUrl, setApiUrl] = useState("")

  // Function to fetch data - either from mock data or real API
  const fetchData = async (endpoint: string) => {
    setLoading(true)
    setError(null)

    try {
      if (apiMode === "mock") {
        // Use mock data
        setTimeout(() => {
          let data

          switch (endpoint) {
            case "quizzes":
              data = mockQuizData
              break
            case "quizzes/id":
              data = mockOdooQuiz
              break
            case "questions":
              data = mockQuestions
              break
            case "questions/id":
              data = mockQuestions.find((q) => q.id.toString() === questionId)
              break
            case "questions/by_quiz":
              data = mockQuestions.filter((q) => q.quiz === quizId)
              break
            case "quizzes/counts":
              data = { quizzes: 3, questions: 12 }
              break
            default:
              data = { message: "Endpoint not found" }
          }

          setResponseData(data)
          setLoading(false)
        }, 500) // Simulate network delay
      } else {
        // Use real API
        let url = `${apiUrl}/api/${endpoint}/`

        // Handle specific endpoints with IDs
        if (endpoint === "quizzes/id") {
          url = `${apiUrl}/api/quizzes/${quizId}/`
        } else if (endpoint === "questions/id") {
          url = `${apiUrl}/api/questions/${questionId}/`
        } else if (endpoint === "questions/by_quiz") {
          url = `${apiUrl}/api/questions/by_quiz/?quiz_id=${quizId}`
        }

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setResponseData(data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
      setResponseData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(activeEndpoint === "quizzes" ? "quizzes" : "questions")
  }, [activeEndpoint, apiMode])

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">API Explorer</h1>

      <div className="mb-6 p-4 bg-card rounded-lg">
        <h2 className="text-lg font-medium mb-3">API Connection Settings</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="mock"
              name="apiMode"
              value="mock"
              checked={apiMode === "mock"}
              onChange={() => setApiMode("mock")}
              className="h-4 w-4"
            />
            <label htmlFor="mock" className="text-sm">
              Use Mock Data
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="real"
              name="apiMode"
              value="real"
              checked={apiMode === "real"}
              onChange={() => setApiMode("real")}
              className="h-4 w-4"
            />
            <label htmlFor="real" className="text-sm">
              Connect to Real API
            </label>
          </div>
          {apiMode === "real" && (
            <div className="flex-1">
              <Input
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="API URL (e.g., http://localhost:8000)"
                className="text-xs"
              />
            </div>
          )}
        </div>
        {apiMode === "mock" && (
          <p className="text-xs text-muted-foreground mt-2">
            Using mock data for demonstration. Connect to a real API when your backend is ready.
          </p>
        )}
      </div>

      <Tabs defaultValue="quizzes" onValueChange={setActiveEndpoint}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="mt-4 md:mt-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Quizzes Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => fetchData("quizzes")} className="text-xs md:text-sm" size="sm">
                    GET /api/quizzes/
                  </Button>

                  <div className="flex flex-1 gap-2">
                    <Input
                      value={quizId}
                      onChange={(e) => setQuizId(e.target.value)}
                      placeholder="Quiz ID"
                      className="max-w-[120px] text-xs"
                    />
                    <Button onClick={() => fetchData("quizzes/id")} className="text-xs md:text-sm" size="sm">
                      GET /api/quizzes/{"{id}"}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => fetchData("quizzes/counts")}
                  className="text-xs md:text-sm w-fit"
                  size="sm"
                  variant="outline"
                >
                  GET /api/quizzes/counts/
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-muted p-3 md:p-4 rounded-md">
                <h3 className="text-xs md:text-sm font-medium mb-2">Response:</h3>
                {loading ? (
                  <p className="text-xs md:text-sm">Loading...</p>
                ) : (
                  <div className="relative">
                    <pre className="text-[10px] md:text-xs overflow-auto max-h-[200px] md:max-h-[300px] lg:max-h-96">
                      {responseData ? JSON.stringify(responseData, null, 2) : "No data"}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-4 md:mt-6">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Questions Endpoint</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => fetchData("questions")} className="text-xs md:text-sm" size="sm">
                    GET /api/questions/
                  </Button>

                  <div className="flex flex-1 gap-2">
                    <Input
                      value={questionId}
                      onChange={(e) => setQuestionId(e.target.value)}
                      placeholder="Question ID"
                      className="max-w-[120px] text-xs"
                    />
                    <Button onClick={() => fetchData("questions/id")} className="text-xs md:text-sm" size="sm">
                      GET /api/questions/{"{id}"}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-1 gap-2">
                  <Input
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                    placeholder="Quiz ID"
                    className="max-w-[120px] text-xs"
                  />
                  <Button
                    onClick={() => fetchData("questions/by_quiz")}
                    className="text-xs md:text-sm"
                    size="sm"
                    variant="outline"
                  >
                    GET /api/questions/by_quiz/?quiz_id={"{id}"}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="bg-muted p-3 md:p-4 rounded-md">
                <h3 className="text-xs md:text-sm font-medium mb-2">Response:</h3>
                {loading ? (
                  <p className="text-xs md:text-sm">Loading...</p>
                ) : (
                  <div className="relative">
                    <pre className="text-[10px] md:text-xs overflow-auto max-h-[200px] md:max-h-[300px] lg:max-h-96">
                      {responseData ? JSON.stringify(responseData, null, 2) : "No data"}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

