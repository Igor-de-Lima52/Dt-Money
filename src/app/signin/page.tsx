import Image from "next/image";

export default function Login() {
  return (
        <div className="bg-[#29292e] rounded-[6px] p-8 md:p-12 max-w-[450px] w-full">
          <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#e1e1e6] text-[28px] mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
            Bem-vindo de volta
          </h1>
          <p className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-base mb-8">
            Faça login para continuar
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-sm mb-2 block">
                E-mail
              </label>
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-3 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
              />
            </div>

            <div>
              <label className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-sm mb-2 block">
                Senha
              </label>
              <input
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#121214] border-0 rounded-[6px] px-4 py-3 text-[#e1e1e6] font-['Roboto:Regular',sans-serif] placeholder:text-[#7c7c8a] focus:outline-none focus:ring-2 focus:ring-[#00b37e]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#00875f] hover:bg-[#015f43] transition-colors text-white font-['Roboto:Bold',sans-serif] font-bold py-4 rounded-[6px] mt-4"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-['Roboto:Regular',sans-serif] text-[#c4c4cc] text-sm">
              Não tem uma conta?{" "}
              <button
                // onClick={() => navigate("/register")}
                className="text-[#00b37e] hover:text-[#00875f] font-bold transition-colors"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
  );
}