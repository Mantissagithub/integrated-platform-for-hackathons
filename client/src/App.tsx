// @ts-nocheck

import React from 'react';
import LuxurySignupPage from './components/signup';
import EnhancedLogin from './components/login';
// import Dashboard from './components/dashboard';
// import IntegratedDashboard from './components/integratedDashboard';
import MainPage from './components/mainPage';
import LoadingPage from './components/loadingPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center"> {/* Subtle background gradient */}
    //   <MainContent />
    // </div>
    <Router>
      <Routes>
        {/* <Route path="/" element={<WelcomePage/>} /> */}
        <Route path="/" element={<LuxurySignupPage/>} />
        <Route path="/login" element={<EnhancedLogin/>} />
        {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="/integratedDashboard" element={<IntegratedDashboard/>} /> */}
        <Route path="/loadingPage" element={<LoadingPage/>} />
        <Route path="/mainPage" element={<MainPage/>} />
        {/* <Route path="/chat" element={<MainContent/>} /> */}
      </Routes>
    </Router>
  );
};

export default App;

// import React, { useState, useRef, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Bell, Code, GitBranch, Settings, Users, Plus, Minus, Move, Menu, X, ChevronDown, Search, MessageSquare, Video, PieChart, LogOut, Send, Rocket, Clock, GitCommit, Upload, Zap } from 'lucide-react'
// import { Slider } from "@/components/ui/slider"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { Progress } from "@/components/ui/progress"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// const teamMembers = [
//   { id: 1, name: "You", role: "Full Stack Developer", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
//   { id: 2, name: "Alice", role: "UI/UX Designer", avatar: "/placeholder.svg?height=32&width=32", status: "online" },
//   { id: 3, name: "Bob", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32", status: "offline" },
//   { id: 4, name: "Charlie", role: "Data Scientist", avatar: "/placeholder.svg?height=32&width=32", status: "busy" },
// ]

// const mockAIResponses = [
//   "Based on your project idea, I suggest starting with a simple prototype that demonstrates the core functionality. Focus on the unique value proposition of your hackathon project.",
//   "For your tech stack, consider using React for the frontend and Node.js with Express for the backend. This combination allows for rapid development and easy deployment.",
//   "To optimize your workflow, try using Git for version control and set up a simple CI/CD pipeline with GitHub Actions. This will help automate your testing and deployment process.",
//   "Don't forget to prepare a compelling pitch for your project. Focus on the problem you're solving, your solution's uniqueness, and potential impact. Practice your presentation timing as well.",
// ]

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("collaboration")
//   const [brushSize, setBrushSize] = useState(5)
//   const [brushColor, setBrushColor] = useState("#4F46E5")
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [sidebarOpen, setSidebarOpen] = useState(true)
//   const [chatMessages, setChatMessages] = useState([
//     { sender: "Alice", message: "Hey team! Let's brainstorm our hackathon project idea." },
//     { sender: "You", message: "I was thinking we could build a real-time collaboration tool for remote teams." },
//     { sender: "Bob", message: "That sounds interesting! What specific problem would it solve?" },
//   ])
//   const [aiMessages, setAiMessages] = useState([
//     { sender: "AI Assistant", message: "Hello! I'm here to help with any questions or suggestions for your hackathon project. What's your initial idea?" },
//   ])
//   const [inputMessage, setInputMessage] = useState("")
//   const [aiInputMessage, setAiInputMessage] = useState("")

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       const ctx = canvas.getContext('2d')
//       if (ctx) {
//         ctx.lineCap = 'round'
//         ctx.lineJoin = 'round'
//       }
//     }
//   }, [])

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       const ctx = canvas.getContext('2d')
//       if (ctx) {
//         ctx.beginPath()
//         ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
//         setIsDrawing(true)
//       }
//     }
//   }

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return
//     const canvas = canvasRef.current
//     if (canvas) {
//       const ctx = canvas.getContext('2d')
//       if (ctx) {
//         ctx.lineWidth = brushSize
//         ctx.strokeStyle = brushColor
//         ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
//         ctx.stroke()
//       }
//     }
//   }

//   const stopDrawing = () => {
//     setIsDrawing(false)
//   }

//   const clearCanvas = () => {
//     const canvas = canvasRef.current
//     if (canvas) {
//       const ctx = canvas.getContext('2d')
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//       }
//     }
//   }

//   const sendMessage = () => {
//     if (inputMessage.trim()) {
//       setChatMessages([...chatMessages, { sender: "You", message: inputMessage }])
//       setInputMessage("")
//     }
//   }

//   const sendAiMessage = () => {
//     if (aiInputMessage.trim()) {
//       setAiMessages([...aiMessages, { sender: "You", message: aiInputMessage }])
//       setAiInputMessage("")
//       // Simulate AI response
//       setTimeout(() => {
//         const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
//         setAiMessages(prev => [...prev, { sender: "AI Assistant", message: randomResponse }])
//       }, 1000)
//     }
//   }

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col`}>
//         <div className="p-4 flex items-center justify-between">
//           {sidebarOpen ? (
//             <h1 className="text-2xl font-bold text-primary">Hackathon</h1>
//           ) : (
//             <h1 className="text-2xl font-bold text-primary">HC</h1>
//           )}
//           <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>
//         <ScrollArea className="flex-1">
//           <div className="px-3 py-2">
//             <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">Team</h2>
//             <div className="space-y-1">
//               {teamMembers.map((member) => (
//                 <Button key={member.id} variant="ghost" className="w-full justify-start">
//                   <Avatar className="h-8 w-8 mr-2">
//                     <AvatarImage src={member.avatar} alt={member.name} />
//                     <AvatarFallback>{member.name[0]}</AvatarFallback>
//                   </Avatar>
//                   {sidebarOpen && (
//                     <>
//                       <div className="flex flex-col items-start">
//                         <span>{member.name}</span>
//                         <span className="text-xs text-muted-foreground">{member.role}</span>
//                       </div>
//                       <span className={`ml-auto h-2 w-2 rounded-full ${
//                         member.status === 'online' ? 'bg-green-500' :
//                         member.status === 'busy' ? 'bg-yellow-500' : 'bg-slate-300'
//                       }`} />
//                     </>
//                   )}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </ScrollArea>
//         <div className="p-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="w-full justify-start">
//                 <Avatar className="h-8 w-8 mr-2">
//                   <AvatarImage src={teamMembers[0].avatar} alt={teamMembers[0].name} />
//                   <AvatarFallback>{teamMembers[0].name[0]}</AvatarFallback>
//                 </Avatar>
//                 {sidebarOpen && (
//                   <>
//                     <span>{teamMembers[0].name}</span>
//                     <ChevronDown className="ml-auto h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Profile</DropdownMenuItem>
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-card border-b border-border px-6 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-2xl font-bold text-primary">Hackathon Project</h2>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Button variant="outline" size="sm">
//                 <Clock className="mr-2 h-4 w-4" />
//                 32:00:00
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Bell className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <div className="flex-1 overflow-auto p-6">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
//             <TabsList className="mb-4 bg-card">
//               <TabsTrigger value="collaboration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                 <Users className="mr-2 h-4 w-4" />
//                 Collaboration
//               </TabsTrigger>
//               <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                 <Code className="mr-2 h-4 w-4" />
//                 Code
//               </TabsTrigger>
//               <TabsTrigger value="deploy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
//                 <Rocket className="mr-2 h-4 w-4" />
//                 Deploy
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="collaboration" className="h-[calc(100%-48px)]">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card className="md:col-span-2">
//                   <CardHeader>
//                     <CardTitle>Idea Canvas</CardTitle>
//                     <CardDescription>Collaborate on ideas visually</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex space-x-4 items-center">
//                         <Button onClick={clearCanvas} variant="outline">Clear Canvas</Button>
//                         <div className="flex items-center space-x-2">
//                           <label htmlFor="brushSize" className="text-sm font-medium">
//                             Brush Size:
//                           </label>
//                           <Slider
//                             id="brushSize"
//                             min={1}
//                             max={20}
//                             step={1}
//                             value={[brushSize]}
//                             onValueChange={(value) => setBrushSize(value[0])}
//                             className="w-32"
//                           />
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <label htmlFor="brushColor" className="text-sm font-medium">
//                             Color:
//                           </label>
//                           <input
//                             type="color"
//                             id="brushColor"
//                             value={brushColor}
//                             onChange={(e) => setBrushColor(e.target.value)}
//                             className="w-8 h-8 rounded-full overflow-hidden"
//                           />
//                         </div>
//                       </div>
//                       <div className="border rounded-md p-1 bg-background">
//                         <canvas
//                           ref={canvasRef}
//                           width={800}
//                           height={400}
//                           onMouseDown={startDrawing}
//                           onMouseMove={draw}
//                           onMouseUp={stopDrawing}
//                           onMouseOut={stopDrawing}
//                           className="w-full cursor-crosshair"
//                         />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Team Chat</CardTitle>
//                     <CardDescription>Discuss ideas with your team</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[300px] mb-4">
//                       {chatMessages.map((msg, index) => (
//                         <div key={index} className={`flex items-start space-x-2 mb-4 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
//                           {msg.sender !== 'You' && (
//                             <Avatar className="h-8 w-8">
//                               <AvatarFallback>{msg.sender[0]}</AvatarFallback>
//                             </Avatar>
//                           )}
//                           <div className={`rounded-lg p-2 ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' :   'bg-muted'}`}>
//                             <p className="text-sm">{msg.message}</p>
//                           </div>
//                           {msg.sender === 'You' && (
//                             <Avatar className="h-8 w-8">
//                               <AvatarFallback>{msg.sender[0]}</AvatarFallback>
//                             </Avatar>
//                           )}
//                         </div>
//                       ))}
//                     </ScrollArea>
//                     <div className="flex items-center space-x-2">
//                       <Input 
//                         placeholder="Type a message..." 
//                         value={inputMessage}
//                         onChange={(e) => setInputMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//                       />
//                       <Button onClick={sendMessage}>Send</Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>AI Assistant</CardTitle>
//                     <CardDescription>Get help and suggestions for your project</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[300px] mb-4">
//                       {aiMessages.map((msg, index) => (
//                         <div key={index} className={`flex items-start space-x-2 mb-4 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
//                           {msg.sender !== 'You' && (
//                             <Avatar className="h-8 w-8">
//                               <AvatarFallback>AI</AvatarFallback>
//                             </Avatar>
//                           )}
//                           <div className={`rounded-lg p-2 ${msg.sender === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
//                             <p className="text-sm">{msg.message}</p>
//                           </div>
//                           {msg.sender === 'You' && (
//                             <Avatar className="h-8 w-8">
//                               <AvatarFallback>{msg.sender[0]}</AvatarFallback>
//                             </Avatar>
//                           )}
//                         </div>
//                       ))}
//                     </ScrollArea>
//                     <div className="flex items-center space-x-2">
//                       <Input 
//                         placeholder="Ask AI for help..." 
//                         value={aiInputMessage}
//                         onChange={(e) => setAiInputMessage(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
//                       />
//                       <Button onClick={sendAiMessage}>Ask</Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="code" className="h-[calc(100%-48px)]">
//               <Card className="h-full">
//                 <CardHeader>
//                   <CardTitle>Web-based IDE</CardTitle>
//                   <CardDescription>Collaborative coding environment for your hackathon project</CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-[calc(100%-88px)]">
//                   <div className="h-full border-2 border-dashed border-border rounded-md flex items-center justify-center bg-muted text-muted-foreground">
//                     VS Code for the Web or code-server would be embedded here
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="deploy" className="h-[calc(100%-48px)]">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <Card className="md:col-span-2">
//                   <CardHeader>
//                     <CardTitle>Deployment Overview</CardTitle>
//                     <CardDescription>Monitor your project's deployment status and history</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="text-lg font-semibold text-primary">Current Status</h3>
//                           <p className="text-sm text-muted-foreground">Last deployed 2 hours ago</p>
//                         </div>
//                         <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Live</Badge>
//                       </div>
//                       <Progress value={100} className="w-full" />
//                       <div className="flex justify-between text-sm text-muted-foreground">
//                         <span>Build</span>
//                         <span>Deploy</span>
//                         <span>Live</span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Git Operations</CardTitle>
//                     <CardDescription>Manage version control for your project</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div>
//                         <h3 className="text-lg font-semibold mb-2 text-primary">Current Branch</h3>
//                         <div className="flex items-center space-x-2 text-muted-foreground">
//                           <GitBranch className="h-5 w-5" />
//                           <span>main</span>
//                         </div>
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold mb-2 text-primary">Pending Changes</h3>
//                         <ScrollArea className="h-[100px] w-full rounded-md border p-4">
//                           <ul className="list-disc list-inside text-muted-foreground">
//                             <li>Modified: src/components/Dashboard.tsx</li>
//                             <li>Added: src/utils/api.ts</li>
//                             <li>Deleted: src/old-component.tsx</li>
//                             <li>Modified: README.md</li>
//                           </ul>
//                         </ScrollArea>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button>
//                           <GitCommit className="mr-2 h-4 w-4" />
//                           Commit Changes
//                         </Button>
//                         <Button variant="outline">
//                           <Upload className="mr-2 h-4 w-4" />
//                           Push to Remote
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Deployment Options</CardTitle>
//                     <CardDescription>Choose where to deploy your hackathon project</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <RadioGroup defaultValue="vercel">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="vercel" id="vercel" />
//                           <Label htmlFor="vercel">Vercel</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="netlify" id="netlify" />
//                           <Label htmlFor="netlify">Netlify</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="github" id="github" />
//                           <Label htmlFor="github">GitHub Pages</Label>
//                         </div>
//                       </RadioGroup>
//                       <Button className="w-full">
//                         <Rocket className="mr-2 h-4 w-4" />
//                         Deploy Project
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Deployment History</CardTitle>
//                     <CardDescription>Recent deployments and their statuses</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[200px] w-full rounded-md">
//                       <Table>
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead>Date</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Environment</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           <TableRow>
//                             <TableCell>2023-10-27 14:30</TableCell>
//                             <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge></TableCell>
//                             <TableCell>Production</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell>2023-10-27 13:15</TableCell>
//                             <TableCell><Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge></TableCell>
//                             <TableCell>Staging</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell>2023-10-27 11:45</TableCell>
//                             <TableCell><Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge></TableCell>
//                             <TableCell>Development</TableCell>
//                           </TableRow>
//                           <TableRow>
//                             <TableCell>2023-10-27 10:00</TableCell>
//                             <TableCell><Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge></TableCell>
//                             <TableCell>Production</TableCell>
//                           </TableRow>
//                         </TableBody>
//                       </Table>
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

