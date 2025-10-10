import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-background py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>
            Copyright © 2025 老Z的知识库 Powered by 老Z
          </p>
          <p>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              粤ICP备2025473692号-1
            </a>
          </p>
          <p className="flex items-center justify-center gap-1">
            <Image
              src="/备案图标.png"
              alt="公安备案图标"
              width={20}
              height={20}
              className="inline-block"
            />
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002008123"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              粤公网安备44030002008123号
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}