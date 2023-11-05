using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Vikingo : MonoBehaviour
{
    public float velocidad = 5.0f; // Velocidad de movimiento

    private Animator animator;

    void Start()
    {
        animator = GetComponent<Animator>();
    }

    void Update()
    {
        // Obtener la entrada del usuario
        float inputHorizontal = Input.GetAxis("Horizontal");

        // Calcular la dirección de movimiento
        Vector2 movimiento = new Vector2(inputHorizontal, 0);

        // Mover el GameObject
        transform.Translate(movimiento * velocidad * Time.deltaTime);

        // Cambiar la animación según la dirección y aplicar el flip horizontal
        if (inputHorizontal < 0)
        {
            animator.SetBool("Caminando", true);
            transform.localScale = new Vector3(-2, 2, 2); // Flip horizontal para mirar hacia la izquierda
        }
        else if (inputHorizontal > 0)
        {
            animator.SetBool("Caminando", true);
            transform.localScale = new Vector3(2, 2, 2); // Sin flip para mirar hacia la derecha
        }
        else
        {
            animator.SetBool("Caminando", false);
        }
    }
}
