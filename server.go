package httpserver

//импортим либы
import (
	"context"
	"net/http"
	"time"
)

// Server создание простого http сервера
type Server struct {
	httpServer *http.Server
}

// Run функция запуска сервера на определенном порте или порту...
//хм, у меня по русскому 91балл, как хочу так иговорю
func (s *Server) Run(port string) error {
	s.httpServer = &http.Server{
		Addr:           ":" + port,
		MaxHeaderBytes: 1 << 20,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
	}
	// http.Server.ListenAndServe  - бесконечная прослушка запросов
	return s.httpServer.ListenAndServe()
}

// ShutDown функция выключение сервера
func (s *Server) ShutDown(ctx context.Context) error {
	return s.httpServer.Shutdown(ctx)
}
