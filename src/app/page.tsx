import PromptForm from '@/components/_form/PromptForm'
import Footer from '@/components/_general/Footer'
import MessageContainer from '@/components/_chat/Messages'

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MessageContainer/>
      </main>
      <Footer>
        <PromptForm />
      </Footer>
    </>
  );
}
