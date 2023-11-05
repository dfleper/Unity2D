using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CollisionController : MonoBehaviour
{
    private Animator animator;


    private void Start()
    {
        animator = GetComponent<Animator>();
    }
    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.name == "Ground")
        {
            animator.SetBool("Colision", true);
            Invoke(nameof(Destroy), 0.4f);
        }
    }

    private void Destroy()
    {
        Destroy(gameObject);
    }
}