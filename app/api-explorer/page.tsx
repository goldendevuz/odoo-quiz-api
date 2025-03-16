"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiExplorer() {
  const [activeEndpoint, setActiveEndpoint] = useState("quizzes")
  const [responseData, setResponseData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (endpoint: string) => {
    setLoading(true)
    try {
      // In a real app, this would fetch from your actual API
      // For demo purposes, we're simulating the response
      const data = simulateApiResponse(endpoint)
      setResponseData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
      setResponseData({ error: "Failed to fetch data" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(activeEndpoint)
  }, [activeEndpoint])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">API Explorer</h1>

      <Tabs defaultValue="quizzes" onValueChange={setActiveEndpoint}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quizzes Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <Button onClick={() => fetchData("quizzes")}>GET /api/quizzes/</Button>
                <Button onClick={() => fetchData("quizzes/odoo")}>GET /api/quizzes/odoo/</Button>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Response:</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(responseData, null, 2)}</pre>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Questions Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <Button onClick={() => fetchData("questions")}>GET /api/questions/</Button>
                <Button onClick={() => fetchData("questions/1")}>GET /api/questions/1/</Button>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Response:</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(responseData, null, 2)}</pre>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simulate API responses for demo purposes
function simulateApiResponse(endpoint: string) {
  const quizData = [
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

  const odooQuiz = {
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
      // More questions would be here
    ],
  }

  const questions = [
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
    // More questions would be here
  ]

  const question1 = {
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
  }

  switch (endpoint) {
    case "quizzes":
      return quizData
    case "quizzes/odoo":
      return odooQuiz
    case "questions":
      return questions
    case "questions/1":
      return question1
    default:
      return { error: "Endpoint not found" }
  }
}

