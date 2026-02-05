export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <section className="max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Você está offline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sem conexão com a internet no momento. Você ainda pode continuar editando os dados do
          formulário; quando voltar a conexão, atualize a página.
        </p>
      </section>
    </main>
  )
}
