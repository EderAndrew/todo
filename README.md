App ToDo v1.1

By Eder Andrew - https://www.linkedin.com/in/andrew-developer/

Resumo:
Aplicativo que registra, em uma api, todos os lembretes que o usuário digitar.

CRUD:
Aplicativo adiciona, modifica e remove um lembrete.

Funcionalidade:
Aplicativo mostra um pequeno card com o lembrete e um botão para remover.
Usuário, ao clicar no card, modifica a cor de verde para o azul claro, indicando que aquela tarefa ja foi feita.

Off-line
Com o AsyncStorage o aplicativo, agora, pode realizar o salvamento e exibição dos itens no celular que não estiver conectado a internet. Quando voltar a conectar a lista da api é apagada e substituida pela lista que esta salva no AsyncStorage. 

Botão de sincronização:
Quando o aplicativo estiver off-line, será possível adicionar e remover um card, porém, quando voltar a ficar on-line,
será preciso realizar uma sincronização, pois a api não recebe a listas automáticamente. Ao clicar no botão no canto superior direito, a api recebe todos os dados que foi modificado na lista. Substitui a lista antiga pela nova. 