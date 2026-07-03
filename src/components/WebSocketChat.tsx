import { useState, useEffect, useRef } from 'react'

type Message = {
  id: string
  content: string
  timestamp: string
  type: 'sent' | 'received'
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export const WebSocketChat = () => {
  const [reconnectCount, setReconnectCount] = useState(0)
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected')
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const connectWebSocket = () => {
      // WebSocket接続を確立
      // エコーサーバー: wss://echo.websocket.org/
      const ws = new WebSocket('wss://echo.websocket.org/')

      ws.onopen = () => {
        // 接続成功
        setConnectionStatus('connected')
        setReconnectCount(0)
        console.log('WebSocket接続成功')
      }

      ws.onmessage = (event) => {
        // メッセージ受信
        const newMessage: Message = {
          id: Date.now().toString(),
          content: event.data,
          timestamp: new Date().toLocaleDateString('ja'),
          type: 'received',
        }
        setMessages((prev) => [...prev, newMessage])
      }

      ws.onerror = (error) => {
        // エラー処理
        setConnectionStatus('error')
        console.log('WebSocketエラー:', error)
      }

      ws.onclose = () => {
        // 接続切断
        setConnectionStatus('disconnected')

        reconnectTimeoutRef.current = setTimeout(() => {
          setReconnectCount((prev) => prev + 1)
        }, 3000)
      }

      wsRef.current = ws
    }

    connectWebSocket()

    // クリーンアップ
    return () => {
      // WebSocket接続を切断
      wsRef.current?.close()
      //setConnectionStatus('disconnected')
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [reconnectCount])

  const sendMessage = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN && inputMessage.trim()) {
      // メッセージ送信
      wsRef.current.send(inputMessage)

      const sentMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        timestamp: new Date().toLocaleDateString('ja'),
        type: 'sent',
      }
      setMessages((prev) => [...prev, sentMessage])
      setInputMessage('')
    }
  }

  return (
    <div className="websocket-chat">
      <h2>WebSocketチャット</h2>

      <div className="connection-status">
        <span className={`status-indicator ${connectionStatus}`} />
        接続状態: {connectionStatus}
        {reconnectCount > 0 && ` (再接続試行: ${reconnectCount}回目)`}
      </div>

      <div className="chat-window">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <span className="message-timestamp">{msg.timestamp}</span>

            <span className="message-content">{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="メッセージを入力..."
          disabled={connectionStatus !== 'connected'}
          className="chat-input"
        />

        <button
          onClick={sendMessage}
          disabled={connectionStatus !== 'connected'}
          className="send-button"
        >
          送信
        </button>
      </div>
    </div>
  )
}
